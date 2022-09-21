import { broadcast, replyError, isModerator } from '../utils';
import { getUser } from '../clients/overlay';
import type { Command } from '.';

export const sh: Command = {
  aliases: ['sh'],
  exec: async (input, args, user) => {
    if (!isModerator(user))
      return replyError(user, 'Somente mods podem usar esse comando 🤭');

    const targetUser = args?.[0] || 'doceazedo911';
    const data = await getUser(targetUser);
    broadcast('cmd:sh', data);
  },
};
