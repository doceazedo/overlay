import { getRedditIcon } from '$lib/services/reddit';
import { decodeHtml } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
  const { subreddit } = params;
  const iconUrl = await getRedditIcon(subreddit);

  return {
    status: 302,
    headers: {
      location: decodeHtml(iconUrl),
    },
  };
};
