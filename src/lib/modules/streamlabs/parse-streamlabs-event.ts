import type {
  MessageDonation,
  MessageSubscription,
  MessageFollow,
  MessageBits,
  MessageRaid,
  StreamlabsAlert,
  StreamlabsEvent,
} from './streamlabs.types';
import { getUser } from '$lib/services/users';

export const parseStreamlabsEvent = async (
  event: StreamlabsEvent,
): Promise<StreamlabsAlert> => {
  const data = event.message[0];
  let title: string;
  let message: string;
  let timeout = 5000;
  let volume = 1;

  switch (data.type) {
    case 'follow': {
      const info: MessageFollow = data;
      title = `<b>${info.name}</b> te seguiu!`;
      volume = 0.3;
      break;
    }

    case 'subscription': {
      const info: MessageSubscription = data;
      timeout = 10000;
      volume = 0.4;

      if (info.streak_months) {
        title = `<b>${info.name}</b> se reinscreveu por ${info.count} ${
          info.count == 1 ? 'mês' : 'meses'
        }!`;
        message = `Agora já são ${info.streak_months} meses!`;
        if (info.message) message += ` – "${info.message}"`;
        break;
      }

      title = `<b>${info.name}</b> se inscreveu por ${info.months} ${
        info.months == 1 ? 'mês' : 'meses'
      }!`;
      break;
    }

    case 'donation': {
      const info: MessageDonation = data;
      timeout = 10000;
      volume = 0.4;
      title = `<b>${info.from}</b> doou ${info.formatted_amount}!`;
      if (info.message) message = `"${info.message}"`;
      break;
    }

    case 'raid': {
      const info: MessageRaid = data;
      timeout = 10000;
      volume = 0.2;
      title = `<b>${info.name}</b> está fazendo uma raid!`;
      message = `${info.raiders} pessoas vieram no grupo!`;
      break;
    }

    case 'bits': {
      const info: MessageBits = data;
      title = `<b>${info.name}</b> mandou ${info.amount} bits!`;
      volume = 0.75;
      break;
    }
  }

  const user = await getUser(data?.name || data?.from);

  return {
    avatar: user.avatar,
    type: data.type,
    title,
    message,
    timeout,
    volume,
  };
};
