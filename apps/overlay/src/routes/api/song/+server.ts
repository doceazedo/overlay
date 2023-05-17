import { runAppleScript } from 'run-applescript';
import { error, json } from '@sveltejs/kit';
import { getTrack } from '$lib/clients/spotify';
import type { RequestHandler } from '@sveltejs/kit';

const getTrackScript = `
set info to ""
tell application "Spotify"
  if player state is playing then
    set title to name of current track
    set cover to artwork url of current track
    set trackid to id of current track
    set artistname to artist of current track
    set progress to player position
    set trackduration to duration of current track

    set info to title & " | " & cover & " | " & trackid & " | " & artistname & " | " & progress & " | " & trackduration
  end if
end tell
return info
`;

const artistArtworks = new Map<string, string>();

export const GET: RequestHandler = async ({ url }) => {
  const result = await runAppleScript(getTrackScript);
  const [title, cover, URI, artist, position, duration] = result.split(' | ');
  const id = URI.split(':')[2];

  const positionSec = parseFloat(position.replace(',', '.'));
  const durationSec = parseFloat(duration.replace(',', '.')) / 1000;
  const progress = (positionSec * 100) / durationSec;

  let artistArtwork = artistArtworks.get(artist);
  if (!artistArtwork) {
    // FIXME: await getTrack(id);
    artistArtworks.set(artist, cover);
    artistArtwork = cover;
  }

  return json({
    song: {
      title,
      cover,
      id,
    },
    artist: {
      name: artist,
      image: artistArtwork,
    },
    progress,
  });
};
