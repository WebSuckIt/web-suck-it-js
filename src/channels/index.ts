import { Base } from "../base";
import {
  CreateChannelRequest,
  CreateChannelResponse,
  GetChannelByNameRequest,
  GetChannelByNameResponse,
  GetChannelListRequest,
  GetChannelListResponse,
  GetOrCreateChannelByNameRequest,
  GetOrCreateChannelByNameResponse,
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

  getChannel(
    channel: GetChannelByNameRequest
  ): Promise<GetChannelByNameResponse> {
    return this.request(`/${resourceName}/${channel?.channelName}/details`, {
      method: "GET",
    });
  }

  getOrCreateChannel(
    channel: GetOrCreateChannelByNameRequest
  ): Promise<GetOrCreateChannelByNameResponse> {
    return this.request(
      `/${resourceName}/${channel?.channelName}/get-or-create`,
      {
        method: "GET",
      }
    );
  }

  getChannels(params: GetChannelListRequest): Promise<GetChannelListResponse> {
    const queryParams = new URLSearchParams({ ...params });
    return this.request(`/${resourceName}/list?${queryParams}`, {
      method: "GET",
    });
  }
}
