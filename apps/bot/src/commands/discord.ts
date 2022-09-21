import { send } from '../utils';
import type { Command } from '.';

export const discord: Command = {
  aliases: ['discord', 'dc', 'disc'],
  exec: async () => {
    send('💬 Entre no nosso Discord: https://discord.gg/vEGRe2kq8B');
  },
};
