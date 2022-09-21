import { getEventSubClient } from './clients';
import { twitchEvents } from './events';
import 'dotenv/config';
import { loggr } from './utils';

const userId = process.env.TWITCH_BROADCASTER_ID || '';

const eventHandler = async () => {
  const eventSubClient = await getEventSubClient();
  await eventSubClient.listen();
  for (const event of twitchEvents) {
    const eventListener = await event(eventSubClient, userId);
    const testCommand = await eventListener.getCliTestCommand();
    loggr.debug(testCommand);
  }
};

export default eventHandler;
