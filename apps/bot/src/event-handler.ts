import { getEventSubClient } from './clients';
import { twitchEvents } from './events';
import 'dotenv/config';

const userId = process.env.TWITCH_BROADCASTER_ID || '';

const eventHandler = async () => {
  const eventSubClient = await getEventSubClient();
  eventSubClient.start();
  for (const event of twitchEvents) {
    event(eventSubClient, userId);
  }
};

export default eventHandler;
