import { send } from '../utils';
import type { Command } from '.';

export const xxx: Command = {
  aliases: ['xxx'],
  exec: async (input, args, user) => {
    send(
      `@${user.username} ama ${args.join(' ')}... excessivamente... aqui não @${
        user.username
      }... tem crianças aqui.`
    );
  },
};
