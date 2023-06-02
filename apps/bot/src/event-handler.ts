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
  eventSubClient.onRevoke((x) => loggr.warn(`Subscription ${x.id} revoked`));
  eventSubClient.onSubscriptionCreateFailure((x) =>
    loggr.warn(`Could not subscribe for ${x.id}`)
  );
  eventSubClient.onSubscriptionCreateSuccess((x) =>
    loggr.init(`Subscribed for ${x.id}`)
  );
  eventSubClient.onSubscriptionDeleteFailure((x) =>
    loggr.warn(`Could not delete subscription for ${x.id}`)
  );
  eventSubClient.onSubscriptionDeleteSuccess((x) =>
    loggr.init(`Subscription for ${x.id} deleted`)
  );
  eventSubClient.onUserSocketConnect((x) => loggr.debug('onUserSocketConnect'));
  eventSubClient.onUserSocketDisconnect((id, error) => {
    loggr.debug('onUserSocketDisconnect');
    console.log(error?.message);
    console.log(error?.name);
    console.log(error?.stack);
  });
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
