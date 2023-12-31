import forge from "node-forge";
import "isomorphic-unfetch";

type Config = {
  userId: string;
  accessKey?: string;
  publicKey?: string;
  baseUrl?: string;
  wssBaseUrl?: string;
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

export type Success = { ok: true; value: string };
export type Failure = { ok: false; error: Error };
export type Result = Success | Failure;

export abstract class Base {
  private userId: string;
  private accessKey?: string;
  private publicKey?: string;

  private baseUrl?: string;
  private wssBaseUrl?: string;

  constructor(config: Config) {
    this.userId = config.userId;
    this.accessKey = config.accessKey;
    this.publicKey = config.publicKey;
    this.baseUrl = config.baseUrl || "https://backend.websuckit.com/api";
    this.wssBaseUrl = config.wssBaseUrl || "wss://backend.websuckit.com";
  }

  private generateChannelPath(args: GenerateChannelPath): Result {
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
        value: `${this.wssBaseUrl}/${userId}/${channelName}?encrypted_token=${base64EncodedEncryptedToken}${replay}`,
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
  getConnectionUrl(args: connectToChannelReq): Result {
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
