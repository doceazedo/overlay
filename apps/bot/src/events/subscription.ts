import type { EventSubWsListener } from '@twurple/eventsub-ws';
import { loggr, send } from '../utils';

export const subscriptionEvent = (
  eventSubClient: EventSubWsListener,
  userId: string
) =>
  eventSubClient.onChannelSubscription(userId, async (e) => {
    send(`Obrigado por se inscrever, @${e.userDisplayName}! 🌟`);

    // TODO: ignore if is resub
    // TODO: send overlay alert

    loggr.debug('EventSubChannelSubscriptionEvent');
    const data = {
      userId: e.userId,
      userName: e.userName,
      userDisplayName: e.userDisplayName,
      broadcasterId: e.broadcasterId,
      broadcasterName: e.broadcasterName,
      broadcasterDisplayName: e.broadcasterDisplayName,
      tier: e.tier,
      isGift: e.isGift,
    };
    console.log(data);
    loggr.toFile(JSON.stringify({ event: 'EventSubChannelSubscriptionEvent', data }, null, 2));
  });
