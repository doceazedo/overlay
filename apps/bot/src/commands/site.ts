import { send } from '../utils';
import type { Command } from '.';

export const site: Command = {
  aliases: ['site', 'website'],
  exec: async (input, args, user) => {
    send(
      '✨ Código fonte do meu site: https://github.com/doceazedo/doceazedo.com'
    );
  },
};
