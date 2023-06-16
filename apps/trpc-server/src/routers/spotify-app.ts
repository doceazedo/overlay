import z from "zod";
import { runAppleScript } from "run-applescript";
import { publicProcedure, router } from "../trpc";
import { searchArtist } from "../clients/deezer";

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

const setVolumeScript = (volume: number) => `
set info to ""
tell application "Spotify"
  set sound volume to ${volume}
  return sound volume
end tell
`;

const artistArtworks = new Map<string, string>();

export const spotifyAppRouter = router({
  getTrack: publicProcedure.query(async () => {
    const result = await runAppleScript(getTrackScript);
    const [title, cover, uri, artist, position, duration] = result.split(" | ");
    if (!uri) return null;

    const id = uri.split(":")[2];

    const positionSec = parseFloat(position.replace(",", "."));
    const durationSec = parseFloat(duration.replace(",", ".")) / 1000;
    const progress = (positionSec * 100) / durationSec;

    let artistArtwork = artistArtworks.get(artist);
    if (!artistArtwork) {
      const artistData = await searchArtist(artist);
      const artwork = artistData?.picture_big || cover;
      artistArtworks.set(artist, artwork);
      artistArtwork = artwork;
    }

    return {
      track: {
        title,
        cover,
        id,
      },
      artist: {
        name: artist,
        image: artistArtwork,
      },
      progress,
    };
  }),
  setVolume: publicProcedure.input(z.number()).mutation(async (opts) => {
    const { input } = opts;
    const result = await runAppleScript(setVolumeScript(input));
    return {
      volume: parseFloat(result),
    };
  }),
});
