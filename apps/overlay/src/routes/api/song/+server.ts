import { json } from '@sveltejs/kit';
import { getArtist, getCurrentPlayingTrack, getPlayback } from '$lib/clients/spotify';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
  const showDetails = url.searchParams.get('details') != null;
  const track = await getCurrentPlayingTrack();
  const playback = await getPlayback();

  if (
    track == null ||
    playback == null ||
    playback.item == null
  ) return json({});

  const progressMs = playback.progress_ms || 0;
  const progress = (progressMs * 100) / playback.item.duration_ms;

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
      progress
    });
  }

  return json({
    title: track.name,
    artist: track.artists[0].name,
    cover: track.album.images[1].url,
    progress
  });
};
