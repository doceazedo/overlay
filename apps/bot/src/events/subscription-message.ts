import type { EventSubListener } from '@twurple/eventsub';
import { broadcast, send } from '../utils';
import type { AlertEventData } from './events.types';

export const subscriptionMessageEvent = (
  eventSubClient: EventSubListener,
  userId: string
) =>
  eventSubClient.subscribeToChannelSubscriptionMessageEvents(
    userId,
    async (e) => {
      const monthsSuffix = e.durationMonths == 1 ? 'mês' : 'meses';

      const isResub = e.durationMonths > 1;
      const isStrike = (e.streakMonths || 0) > 0;

      const resubNote = e.messageText ? ` - "${e.messageText}"` : '.';
      const strikeNote = isStrike ? ` (total de: ${e.streakMonths}m)` : '';
      const notes = strikeNote + resubNote;

      const subTitle = 'Nova inscrição! 🌟';
      const resubTitle = 'Renovação de sub! 🌟';

      const subMessage = `${e.userDisplayName} se inscreveu por ${e.durationMonths} ${monthsSuffix}.`;
      const resubMessage = `${e.userDisplayName} se reinscreveu por ${e.durationMonths} ${monthsSuffix}${notes}`;

      const title = isResub ? resubTitle : subTitle;
      const body = isResub ? resubMessage : subMessage;

      send(`@${body} 🌟`);
      broadcast<AlertEventData>('event:alert', {
        type: 'subscription',
        title: `${e.userDisplayName} se inscreveu!`,
        message: e.messageText,
        image: '/assets/img/sailor-moon-hug.gif',
        audio: '/assets/audio/alert-subscription.mp3',
      });
    }
  );
