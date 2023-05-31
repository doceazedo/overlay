import { broadcast, playRandomTikTokTTS, send } from '../../utils';
import type { AlertEventData } from '../events.types';
import type { ChatClient } from '@twurple/chat';

export const resubEvent = (chatClient: ChatClient, userId: string) =>
  chatClient.onResub((channel, user, info) => {
    const months = `${info.months} ${info.months == 1 ? 'mês' : 'meses'}`;
    const forThe = info.months == 1 ? 'pelo' : 'pelos';
    send(`Obrigado ${forThe} ${months} de sub, @${info.displayName}! 🌟`);
    broadcast<AlertEventData>('event:alert', {
      type: 'subscription',
      title: `${info.displayName} se reinscreveu!`,
      message: info.message,
      image: '/assets/img/sailor-moon-hug.gif',
      audio: '/assets/audio/alert-subscription.mp3',
    });

    if (info.message) playRandomTikTokTTS(info.message);
  });
