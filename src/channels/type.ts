export type Channel = {
  id: string;
  name: string;
  pass_key: string;
  max_connections: null | number;
  user_id: string;
  created_at: string;
  updated_at: string;
};
export type CreateChannelResponse = {
  channel: Channel;
};

export interface CreateChannelRequest {
  channel: string;
  max_connections?: number;
}

export type EditChannelResponse = {
  channel: Channel;
};

export type GetChannelByNameResponse = Channel;

export type GetChannelByNameRequest = {
  channelName: string;
};

export type GetOrCreateChannelByNameRequest = {
  channelName: string;
};

export type GetOrCreateChannelByNameResponse = Channel;

export interface UpdateChannelRequest {
  channelId: string;
  channel: string;
  regenerate_pass_key: boolean;
  max_connections?: number;
}

export interface UpdateChannelResponse {
  channel: string;
}

export interface GetChannelListRequest {
  page: string;
  per_page: string;
  search_key?: string;
}

export type GetChannelListResponse = Channel[];

export interface DeleteChannelRequest {
  channelId: string;
}

export type DeleteChannelResponse = string;
