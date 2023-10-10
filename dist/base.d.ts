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
export declare abstract class Base {
    private userId;
    private accessKey?;
    private baseUrl;
    private wssBaseUrl;
    constructor(config: Config);
    private messageEncryption;
    connect(args: connectToChannelReq): WebSocket;
    protected request<T>(endpoint: string, options?: RequestInit): Promise<T>;
}
export {};
