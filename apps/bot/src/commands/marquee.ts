import { broadcast, isModerator, reply, replyError } from '../utils';
import type { Command } from '.';

let content = '';

export const marquee: Command = {
  aliases: ['marquee', 'marquinhos', 'meta', 'projeto'],
  exec: async (input, args, user) => {
    if (args.length) {
      if (isModerator(user)) {
        content = args.join(' ');
        broadcast('cmd:marquee');
        reply(user, `marquee atualizado: "${content}"`);
        return;
      }
      return replyError(user, 'somente mods podem usar esse comando 🤭');
    }

    if (!content) return;

    broadcast('cmd:marquee');
    reply(user, content);
  }
};
