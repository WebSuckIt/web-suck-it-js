import forge from "node-forge";
import fetch from "isomorphic-unfetch";

type Config = {
  userId: string;
  accessKey?: string;
  publicKey?: string;
};

type connectToChannelReq = {
  channelName: string;
  channelPassKey: string;
  replaySelf?: boolean;
};

type GenerateChannelPath = {
  publicKey: string;
  channelName: string;
  channelPassKey: string;
  userId: string;
  replaySelf?: boolean;
};

export type Success<V> = { ok: true; value: V };
export type Failure<E extends Error> = {
  ok: false;
  error: E;
};
export type Result<Value, E extends Error = Error> =
  | Success<Value>
  | Failure<E>;

export abstract class Base {
  private userId: string;
  private accessKey?: string;
  private publicKey?: string;

  private baseUrl =
    process.env.WEBSUCKIT_BASE_URL || "https://backend.websuckit.com/api";
  private wssBaseUrl =
    process.env.WEBSUCKIT_WSS_BASE_URL ?? "ws://backend.websuckit.com";

  constructor(config: Config) {
    this.userId = config.userId;
    this.accessKey = config.accessKey;
    this.publicKey = config.publicKey;
  }

  private generateChannelPath(args: GenerateChannelPath): Result<string> {
    try {
      const { publicKey, userId, channelName, channelPassKey, replaySelf } =
        args;
      const replay =
        replaySelf !== undefined ? `&replay_self=${replaySelf}` : "";
      const encodedToken = `user_id=${userId}&channel=${channelName}&channel_pass_key=${channelPassKey}${replay}`;
      const forgePublicKey = forge.pki.publicKeyFromPem(publicKey);
      const encryptedToken = forgePublicKey.encrypt(encodedToken, "RSA-OAEP", {
        md: forge.md.sha256.create(),
      });
      const base64EncodedEncryptedToken = forge.util
        .encode64(encryptedToken)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
      return {
        ok: true,
        value: `${this.wssBaseUrl}${userId}/${channelName}?encrypted_token=${base64EncodedEncryptedToken}${replay}`,
      };
    } catch (error) {
      return { ok: false, error };
    }
  }

  /**
   * Connect to channel
   * @param args {connectToChannelReq}
   * @returns string // websocket connection url
   */
  getConnectionUrl(args: connectToChannelReq): Result<string> {
    const connectionUrl = this.generateChannelPath({
      ...args,
      publicKey: this.publicKey,
      userId: this.userId,
    });
    return connectionUrl;
  }

  protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    if (!this.accessKey)
      throw new Error("Accesskey is required in accessing api");

    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "x-user-id": this.userId,
      "x-access-key": this.accessKey,
    };
    const config = {
      ...options,
      headers,
    };

    return fetch(url, config).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    });
  }
}
