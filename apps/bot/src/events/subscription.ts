import type { EventSubListener } from '@twurple/eventsub';
import { send } from '../utils';

export const subscriptionEvent = (
  eventSubClient: EventSubListener,
  userId: string
) =>
  eventSubClient.subscribeToChannelSubscriptionEvents(userId, async (e) => {
    send(`Obrigado por se inscrever, @${e.userDisplayName} 🌟`);
  });
