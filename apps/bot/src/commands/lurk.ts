import { send } from '../utils';
import { lurkers } from '../stores/lurk';
import type { Command } from '.';

export const lurk: Command = {
  aliases: ['lurk'],
  exec: async (input, args, user) => {
    if (user['user-id']) lurkers.add(user['user-id']);
    send(`@${user.username} está lurkeando 😶‍🌫️`);
  },
};
