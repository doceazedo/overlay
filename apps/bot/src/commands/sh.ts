import { broadcast } from '../utils';
import { modOnlyCmd } from '../middlewares';
import { getUser } from '../clients/overlay';
import type { Command } from '.';

export const sh: Command = {
  aliases: ['sh'],
  exec: (input, args, user) =>
    modOnlyCmd(user, async () => {
      const targetUser = args?.[0] || 'doceazedo911';
      const data = await getUser(targetUser);
      broadcast('cmd:sh', data);
    })
};
