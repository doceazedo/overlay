import { broadcast, reply } from '../utils';
import { modOnlyCmd } from '../middlewares';
import type { Command } from '.';

let content = '';

export const marquee: Command = {
  aliases: ['marquee', 'marquinhos', 'meta', 'projeto'],
  exec: async (input, args, user) => {
    // trying to change content
    if (args.length)
      return modOnlyCmd(user, () => {
        content = args.join(' ');
        broadcast('cmd:marquee');
        reply(user, `marquee atualizado: "${content}"`);
      });

    // there's not content
    if (!content) return;

    broadcast('cmd:marquee');
    reply(user, content);
  }
};
