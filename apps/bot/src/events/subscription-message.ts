import type { EventSubWsListener } from '@twurple/eventsub-ws';
import { broadcast, loggr, send } from '../utils';
import type { AlertEventData } from './events.types';

export const subscriptionMessageEvent = (
  eventSubClient: EventSubWsListener,
  userId: string
) =>
  eventSubClient.onChannelSubscriptionMessage(
    userId,
    async (e) => {
      const months = e.cumulativeMonths == 1 ? `${e.cumulativeMonths} mês` : `${e.cumulativeMonths} meses`;

      send(`${e.userDisplayName} se reinscreveu por ${months}! 🌟`);
      broadcast<AlertEventData>('event:alert', {
        type: 'subscription',
        title: `${e.userDisplayName} se reinscreveu!`,
        message: e.messageText,
        image: '/assets/img/sailor-moon-hug.gif',
        audio: '/assets/audio/alert-subscription.mp3',
      });

      loggr.debug('EventSubChannelSubscriptionMessageEvent');
      const data = {
        userId: e.userId,
        userName: e.userName,
        userDisplayName: e.userDisplayName,
        broadcasterId: e.broadcasterId,
        broadcasterName: e.broadcasterName,
        broadcasterDisplayName: e.broadcasterDisplayName,
        tier: e.tier,
        cumulativeMonths: e.cumulativeMonths,
        streakMonths: e.streakMonths,
        durationMonths: e.durationMonths,
        messageText: e.messageText,
      };
      console.log(data);
      loggr.toFile(JSON.stringify({ event: 'EventSubChannelSubscriptionMessageEvent', data }, null, 2));
    }
  );
