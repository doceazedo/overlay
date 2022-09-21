import { reply } from '../utils';
import type { Command } from '.';

export const ping: Command = {
  aliases: ['ping', 'foo'],
  exec: async (input, args, user) => {
    const str = input == 'ping' ? 'pong! 🏓' : 'bar! 👽';
    reply(user, str);
  },
};
