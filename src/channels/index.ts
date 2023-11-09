import { Base } from "../base";
import {
  CreateChannelRequest,
  CreateChannelResponse,
  DeleteChannelRequest,
  DeleteChannelResponse,
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
    return this.request(`/${resourceName}/${channel.channelId}/update`, {
      method: "PUT",
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

  deleteChannel(channel: DeleteChannelRequest): Promise<DeleteChannelResponse> {
    return this.request(`/${resourceName}/${channel.channelId}/delete`, {
      method: "DELETE",
      body: JSON.stringify(channel),
    });
  }
}
