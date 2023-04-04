import { broadcast } from '../utils';
import { modOnlyCmd } from '../middlewares';
import type { Command } from '.';

export const confetti: Command = {
  aliases: ['confetti', 'confete'],
  exec: (input, args, user) =>
    modOnlyCmd(user, () => {
      const duration = parseInt(args?.[0]) || 5000;
      broadcast('cmd:confetti', duration);
    }),
};
