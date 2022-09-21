import { tmiClient } from './clients';
import io from './websockets';
import commandHandler from './command-handler';
import eventHandler from './event-handler';
import { loggr } from './utils';
import 'dotenv/config';

const { TWITCH_CHANNEL, PORT } = process.env;

loggr.init(`Connecting to channel ${TWITCH_CHANNEL}...`);
tmiClient.connect();

tmiClient.on('message', (channel, tags, message, self) => {
  if (self || !message.startsWith('!')) return;
  commandHandler(channel, tags, message);
});

loggr.init(`Listening to Twitch EventSub...`);
eventHandler();

const wsPort = parseInt(PORT || '80');
loggr.init(`Websocket server listening to port ${wsPort}...`);
io.listen(wsPort);
