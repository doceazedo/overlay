import { send } from '../utils';
import type { Command } from '.';

export const overlay: Command = {
  aliases: ['overlay'],
  exec: async () => {
    send('✨ Código fonte do overlay: https://github.com/doceazedo/overlay');
  },
};
