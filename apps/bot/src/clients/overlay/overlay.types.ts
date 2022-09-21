export type CurrentlyPlayingDetailsResponse = {
  song: {
    title: string;
    cover: string;
    id: string;
  };
  artist: {
    name: string;
    image: string;
  };
};

export type User = {
  id: string;
  pronouns?: string;
  team?: string;
  messages: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UserRequest = {
  pronouns?: string;
  team?: string;
  messages?: number;
};

export type UserResponse = User & {
  id: string;
  displayName: string;
  avatar: string;
  messages: string;
  createdAt: Date;
  updatedAt: Date;
};

export type FollowsResponse = {
  from_id: string;
  from_login: string;
  from_name: string;
  to_id: string;
  to_name: string;
  followed_at: Date;
} | null;
