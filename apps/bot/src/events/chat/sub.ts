import { broadcast, send } from '../../utils';
import type { AlertEventData } from '../events.types';
import type { ChatClient } from '@twurple/chat';

export const subEvent = (chatClient: ChatClient, userId: string) =>
  chatClient.onSub((channel, user, info) => {
    send(`Obrigado por se inscrever, @${info.displayName}! 🌟`);
    broadcast<AlertEventData>('event:alert', {
      type: 'subscription',
      title: `${info.displayName} se inscreveu!`,
      image: '/assets/img/sailor-moon-hug.gif',
      audio: '/assets/audio/alert-subscription.mp3',
    });
  });
