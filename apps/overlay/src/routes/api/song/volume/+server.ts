import { runAppleScript } from 'run-applescript';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

const setVolumeScript = (volume: number) => `
set info to ""
tell application "Spotify"
  set sound volume to ${volume}
  return sound volume
end tell
`;

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  const volume = parseInt(data.volume);
  if (isNaN(volume)) throw error(400, 'Invalid volume');

  const result = await runAppleScript(setVolumeScript(volume));

  return json({
    volume: result,
  });
};
