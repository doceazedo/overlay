import { send } from '../utils';
import type { Command } from '.';

export const kiss: Command = {
  aliases: ['kiss', 'beijo'],
  exec: async (input, args, user) => {
    send(`@${user.username} beija ${args.join(' ')} <3`);
  },
};
