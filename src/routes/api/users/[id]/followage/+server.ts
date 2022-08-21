import { json } from '@sveltejs/kit';
import { getTwitchFollows, getTwitchUser } from '$lib/clients/twitch';
import { CHANNEL_ID } from '$lib/env';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
  const { id } = params;
  const useLogin = isNaN(parseInt(id));
  const twitchUser = await getTwitchUser(id, useLogin);
  const data = await getTwitchFollows(twitchUser.id, CHANNEL_ID);

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
  // Suggestion (check for correctness before using):
  // return json(data);
  return {
    body: data,
  };
};
