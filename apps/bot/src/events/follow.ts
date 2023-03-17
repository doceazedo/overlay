import type { EventSubWsListener } from '@twurple/eventsub-ws';
import { broadcast, send } from '../utils';
import type { AlertEventData } from './events.types';

export const followEvent = (eventSubClient: EventSubWsListener, userId: string) =>
  eventSubClient.onChannelFollow(userId, userId, (e) => {
    send(`@${e.userDisplayName} acabou de seguir! 💜`);
    broadcast<AlertEventData>('event:alert', {
      type: 'follow',
      title: `${e.userDisplayName} segiu!`,
      message: 'Obrigado e seja bem-vinde!',
      image: '/assets/img/sailor-moon-sailor-mars.gif',
      audio: '/assets/audio/alert-follow.mp3',
    });
  });
