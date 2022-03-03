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

const baseUrl = 'https://api.twitch.tv/helix';
const { TWITCH_CLIENT_ID, TWITCH_OAUTH_TOKEN } = process.env;

export const getTwitchUser = async (id: string) => {
  const resp = await fetch(`${baseUrl}/users?id=${id}`, {
    headers: {
      Authorization: `Bearer ${TWITCH_OAUTH_TOKEN}`,
      'Client-Id': TWITCH_CLIENT_ID,
    },
  });
  const data: TwitchUsersResponse = await resp.json();
  return data.data[0];
};
