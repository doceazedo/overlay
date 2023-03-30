import { tmiClient } from './clients';
import io from './websockets';
import commandHandler from './command-handler';
import eventHandler from './event-handler';
import { messageEvents } from './events';
import { loggr } from './utils';
import 'dotenv/config';

const { TWITCH_CHANNEL, PORT } = process.env;

loggr.init(`Connecting to channel ${TWITCH_CHANNEL}...`);
tmiClient.connect();

tmiClient.on('message', (channel, tags, message, self) => {
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

loggr.debug('logado');