import fs from 'fs';
import { tmiClient } from './clients';
import io from './websockets';
import commandHandler from './command-handler';
import eventHandler from './event-handler';
import { messageEvents } from './events';
import { loggr } from './utils';
import 'dotenv/config';
import { trpc } from 'trpc-client';

const { TWITCH_CHANNEL, PORT } = process.env;

loggr.init(`Connecting to channel ${TWITCH_CHANNEL}...`);
tmiClient.connect();

tmiClient.on('message', (channel, tags, message, self) => {
  fs.writeFileSync(
    `identities/${tags.username}.json`,
    JSON.stringify({
      ...tags,
      emotes: null,
    })
  );

  if (self) return;

  const isCommand = message.startsWith('!');
  for (const event of messageEvents) {
    event(message, isCommand, tags);
  }

  if (!isCommand) return;
  commandHandler(channel, tags, message);
});

loggr.init(`Listening to Twitch EventSub...`);
eventHandler();

const wsPort = parseInt(PORT || '80');
loggr.init(`Websocket server listening to port ${wsPort}...`);
io.listen(wsPort);

const setVolumeTimer = setInterval(async () => {
  const data = await trpc.spotifyApp.setVolume.mutate(40);
  if (!isNaN(data.volume)) {
    clearInterval(setVolumeTimer);
    loggr.info('Spotify playback volume set to 40%');
  }
}, 1000);
