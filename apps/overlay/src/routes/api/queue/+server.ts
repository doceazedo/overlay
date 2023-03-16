import { error, json } from '@sveltejs/kit';
import { findFirstTrack, getTrack, queueTrack } from '$lib/clients/spotify';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  if (!data.query) throw error(400);

  const possiblyAnID = data.query.split('track:')?.[1] // uri
    || data.query.split('track/')?.[1]?.split('?')?.[0] // url
    || data.query; // id

  const track = await getTrack(possiblyAnID) || await findFirstTrack(data.query);
  if (!track) return json({ track }); // null

  const queuedTrack = await queueTrack(track.uri);
  if (!queuedTrack) throw error(500);

  return json({ track });
};
