import forge from "node-forge";

type Config = {
  userId: string;
  accessKey?: string;
};

type connectToChannelReq = {
  publicKey: string;
  channelName: string;
  channelPassKey: string;
  userId: string;
  replaySelf?: boolean;
};

export abstract class Base {
  private userId: string;
  private accessKey?: string;

  // TODO: move to env
  private baseUrl = "http://locahost:9999";
  private wssBaseUrl = "ws://locahost:9999";

  constructor(config: Config) {
    this.userId = config.userId;
    this.accessKey = config.accessKey;
  }

  private messageEncryption(args: connectToChannelReq): string {
    const { publicKey, userId, channelName, channelPassKey, replaySelf } = args;
    const replay = replaySelf !== undefined ? `&replay_self=${replaySelf}` : "";
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

    return `${userId}/${channelName}?encrypted_token=${base64EncodedEncryptedToken}${replay}`;
  }

  /**
   * Connect to channel
   * @param args {connectToChannelReq}
   * @returns string
   */
  connect(args: connectToChannelReq): WebSocket {
    const webSocketConnection = new WebSocket(
      this.wssBaseUrl + this.messageEncryption(args)
    );
    return webSocketConnection;
  }

  protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
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
