import { getSubredditIcon } from '$lib/modules/memes';
import { decodeHtml } from '$lib/utils';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
  const { subreddit } = params;
  const iconUrl = await getSubredditIcon(subreddit);

  return new Response(undefined, {
    status: 302,
    headers: {
      location: decodeHtml(iconUrl),
    }
  });
};
