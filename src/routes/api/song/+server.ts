import { json } from '@sveltejs/kit';
import { getArtist, getCurrentPlayingTrack } from '$lib/clients/spotify';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const showDetails = url.searchParams.get('details') != null;
  const track = await getCurrentPlayingTrack();

  if (track == null) return json({});

  if (showDetails) {
    const artist = await getArtist(track.artists[0].id);
    return json({
  song: {
    title: track.name,
    cover: track.album.images[1].url,
    id: track.id,
  },
  artist: {
    name: artist.name,
    image: artist.images[0].url,
  },
});
  }

  return json({
  title: track.name,
  artist: track.artists[0].name,
  cover: track.album.images[1].url,
});
};
