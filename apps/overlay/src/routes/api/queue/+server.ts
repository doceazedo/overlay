import { error, json } from '@sveltejs/kit';
import { queueTrack } from '$lib/clients/spotify';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  if (!data.uri) throw error(400);

  const track = await queueTrack(data.uri);
  if (!track) throw error(500);

  return json({ track });
};
