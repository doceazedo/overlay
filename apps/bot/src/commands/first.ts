import { send, sendError } from '../utils';
import type { Command } from '.';

let firstUsername: string;

export const first: Command = {
  aliases: ['first'],
  exec: async (input, args, user) => {
    if (firstUsername) return sendError(`Tarde demais, @${firstUsername} chegou antes de você! 🏃`);

    firstUsername = user['display-name'] || 'unknown';
    send(`@${firstUsername} foi a primeira pessoa a chegar! 🏃🏁🎊`);
  },
};
