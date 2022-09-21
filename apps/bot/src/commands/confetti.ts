import { broadcast, isModerator, replyError } from '../utils';
import type { Command } from '.';

export const confetti: Command = {
  aliases: ['confetti', 'confete'],
  exec: async (input, args, user) => {
    if (!isModerator(user))
      return replyError(user, 'Somente mods podem usar esse comando 🤭');

    const duration = parseInt(args?.[0]) || 5000;
    broadcast('cmd:confetti', duration);
  },
};
