import { getTwitchFollows, getTwitchUser } from '$lib/clients/twitch';
import { CHANNEL_ID } from '$lib/env';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
  const { id } = params;
  const useLogin = isNaN(parseInt(id));
  const twitchUser = await getTwitchUser(id, useLogin);
  const data = await getTwitchFollows(twitchUser.id, CHANNEL_ID);

  return {
    body: data,
  };
};
