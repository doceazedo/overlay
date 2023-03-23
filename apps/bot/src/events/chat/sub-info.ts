import { broadcast, send } from '../../utils';
import type { AlertEventData } from '../events.types';
import type { ChatClient } from '@twurple/chat';

export const subInfo = (chatClient: ChatClient, userId: string) =>
  chatClient.onSub((channel, user, subInfo) => {
    const months = `${subInfo.months} ${subInfo.months == 1 ? 'mês' : 'meses'}`;
    const chatMessage = subInfo.months == 1
      ? `Obrigado por se inscrever, @${subInfo.displayName}! 🌟`
      : `${subInfo.displayName} se reinscreveu por ${months}! 🌟`;
    const action = subInfo.months ? 'inscreveu' : 'reinscreveu';

    send(chatMessage);
    broadcast<AlertEventData>('event:alert', {
      type: 'subscription',
      title: `${subInfo.displayName} se ${action}!`,
      message: subInfo.message,
      image: '/assets/img/sailor-moon-hug.gif',
      audio: '/assets/audio/alert-subscription.mp3',
    });
  });
