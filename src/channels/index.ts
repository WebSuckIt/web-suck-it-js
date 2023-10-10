import { Base } from "../base";
import {
  CreateChannelRequest,
  CreateChannelResponse,
  GetChannelByNameRequest,
  GetChannelByNameResponse,
  GetChannelListRequest,
  GetChannelListResponse,
  UpdateChannelRequest,
  UpdateChannelResponse,
} from "./type";

const resourceName = "channel";

export class Channels extends Base {
  createChannel(channel: CreateChannelRequest): Promise<CreateChannelResponse> {
    return this.request(`/${resourceName}/create`, {
      method: "POST",
      body: JSON.stringify(channel),
    });
  }

  updateChannel(channel: UpdateChannelRequest): Promise<UpdateChannelResponse> {
    return this.request(`/${resourceName}/update`, {
      method: "POST",
      body: JSON.stringify(channel),
    });
  }

  getChannelByName(
    channel: GetChannelByNameRequest
  ): Promise<GetChannelByNameResponse> {
    return this.request(`/${resourceName}/${channel?.channelName}/details`);
  }

  getChannels(params: GetChannelListRequest): Promise<GetChannelListResponse> {
    const queryParams = new URLSearchParams({ ...params });
    return this.request(`/${resourceName}/list?${queryParams}`);
  }
}
