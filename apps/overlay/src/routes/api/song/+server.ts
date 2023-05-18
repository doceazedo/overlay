import { runAppleScript } from 'run-applescript';
import { error, json } from '@sveltejs/kit';
import { getArtist, getTrack } from '$lib/clients/spotify';
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
    const track = await getTrack(id);

    const artistID = track?.artists?.[0]?.id;
    if (!artistID) throw error(500, 'Could not get artist ID');

    const artist = await getArtist(artistID);
    if (!artist) throw error(500, 'Could not find artist');

    const artwork = artist.images[0].url;
    artistArtworks.set(artist.id, artwork);
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
