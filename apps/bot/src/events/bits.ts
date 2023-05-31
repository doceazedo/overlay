import type { EventSubWsListener } from '@twurple/eventsub-ws';
import { broadcast, playRandomTikTokTTS, send } from '../utils';
import type { AlertEventData } from './events.types';

export const bitsEvent = (eventSubClient: EventSubWsListener, userId: string) =>
  eventSubClient.onChannelCheer(userId, (e) => {
    const displayName = e.userDisplayName || 'Anonimo';
    const title = `${displayName} mandou ${e.bits} bits! 💎`;
    send(`@${title}`);
    broadcast<AlertEventData>('event:alert', {
      type: 'bits',
      title: `${e.userDisplayName} mandou ${e.bits}!`,
      message: e.message,
      image: '/assets/img/rei-chair.gif',
      audio: '/assets/audio/alert-bits.mp3',
    });

    if (e.message) playRandomTikTokTTS(e.message);
  });
