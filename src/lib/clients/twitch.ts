type TwitchUsersResponse = {
  data: {
    id: string;
    login: string;
    display_name: string;
    type: string;
    broadcaster_type: string;
    description: string;
    profile_image_url: string;
    offline_image_url: string;
    view_count: number;
    created_at: Date;
  }[];
};

type TwitchFollowsResponse = {
  data: {
    from_id: string;
    from_login: string;
    from_name: string;
    to_id: string;
    to_name: string;
    followed_at: Date;
  }[];
};

const baseUrl = 'https://api.twitch.tv/helix';
const { TWITCH_CLIENT_ID, TWITCH_OAUTH_TOKEN } = process.env;
const headers = {
  Authorization: `Bearer ${TWITCH_OAUTH_TOKEN}`,
  'Client-Id': TWITCH_CLIENT_ID,
};

export const getTwitchUser = async (id: string, useLogin: boolean) => {
  const param = useLogin ? 'login' : 'id';
  const resp = await fetch(`${baseUrl}/users?${param}=${id}`, {
    headers,
  });
  const data: TwitchUsersResponse = await resp.json();
  return data.data[0];
};

export const getTwitchFollows = async (from: string, to: string) => {
  const resp = await fetch(
    `${baseUrl}/users/follows?from_id=${from}&to_id=${to}`,
    {
      headers,
    },
  );
  const data: TwitchFollowsResponse = await resp.json();
  return data.data[0];
};
