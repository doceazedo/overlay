import z from "zod";
import { runAppleScript } from "run-applescript";
import { publicProcedure, router } from "../trpc";

const getTrackScript = `
set info to ""
tell application "Spotify"
  if player state is playing then
    set title to name of current track
    set artistname to artist of current track
    set trackid to id of current track

    set info to title & " | " & artistname & " | " & trackid
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

export const spotifyAppRouter = router({
  getTrack: publicProcedure.query(async () => {
    const result = await runAppleScript(getTrackScript);
    const [title, artist, uri] = result.split(" | ");
    if (!uri) return null;

    const id = uri.split(":")[2];
    return { title, artist, id };
  }),
  setVolume: publicProcedure.input(z.number()).mutation(async (opts) => {
    const { input } = opts;
    const result = await runAppleScript(setVolumeScript(input));
    return {
      volume: parseFloat(result),
    };
  }),
});
