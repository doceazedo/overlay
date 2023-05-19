import { runAppleScript } from 'run-applescript';
import { json } from '@sveltejs/kit';
import { searchArtist } from '$lib/clients/deezer';
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

export const GET: RequestHandler = async () => {
  const result = await runAppleScript(getTrackScript);
  const [title, cover, URI, artist, position, duration] = result.split(' | ');
  const id = URI.split(':')[2];

  const positionSec = parseFloat(position.replace(',', '.'));
  const durationSec = parseFloat(duration.replace(',', '.')) / 1000;
  const progress = (positionSec * 100) / durationSec;

  let artistArtwork = artistArtworks.get(artist);
  if (!artistArtwork) {
    const artistData = await searchArtist(artist);
    const artwork = artistData?.picture_big || cover;
    artistArtworks.set(artist, artwork);
    artistArtwork = artwork;
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
