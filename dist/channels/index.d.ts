import { Base } from "../base";
import { CreateChannelRequest, CreateChannelResponse, GetChannelByNameRequest, GetChannelByNameResponse, GetChannelListRequest, GetChannelListResponse, UpdateChannelRequest, UpdateChannelResponse } from "./type";
export declare class Channels extends Base {
    createChannel(channel: CreateChannelRequest): Promise<CreateChannelResponse>;
    updateChannel(channel: UpdateChannelRequest): Promise<UpdateChannelResponse>;
    getChannelByName(channel: GetChannelByNameRequest): Promise<GetChannelByNameResponse>;
    getChannels(params: GetChannelListRequest): Promise<GetChannelListResponse>;
}
