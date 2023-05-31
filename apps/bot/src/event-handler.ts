import { chatClient, getEventSubClient } from './clients';
import { chatEvents, twitchEvents } from './events';
import 'dotenv/config';
import { loggr } from './utils';

const userId = process.env.TWITCH_BROADCASTER_ID || '';

const eventHandler = async () => {
  // Twitch Events
  const eventSubClient = await getEventSubClient();
  eventSubClient.start();
  loggr.init('EventSubWsListener started');
  for (const event of twitchEvents) {
    event(eventSubClient, userId);
  }

  // Chat Events
  chatClient.connect();
  loggr.init('ChatClient started');
  for (const event of chatEvents) {
    event(chatClient, userId);
    // TODO: listen for gift subs
    // https://twurple.js.org/docs/examples/chat/sub-gift-spam.html
  }
};

export default eventHandler;
