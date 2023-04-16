import { error, json } from '@sveltejs/kit';
import { findFirstTrack, getTrack, } from '$lib/clients/spotify';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  if (!query) throw error(400);

  const possiblyAnID = query.split('track:')?.[1] // uri
    || query.split('track/')?.[1]?.split('?')?.[0] // url
    || query; // id

  const track = await getTrack(possiblyAnID) || await findFirstTrack(query);

  return json({ track });
};