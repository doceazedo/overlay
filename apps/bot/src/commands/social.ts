import { sendStriped } from '../utils';
import type { Command } from '.';

const socialsArr = [
  '🐙 GitHub: https://github.com/doceazedo',
  '🐤 Twitter: https://twitter.com/doceazedo911',
  '📸 Instagram: https://instagram.com/doceazedo911',
  '💬 Discord: https://discord.gg/vEGRe2kq8B',
  '🎵 Lastfm: https://last.fm/user/doceazedo911',
  '💼 Polywork: https://polywork.com/doceazedo',
];

export const social: Command = {
  aliases: ['social', 'socials', 'redes', 'github', 'gh'],
  exec: async () => {
    sendStriped(socialsArr, 'DodgerBlue', 'BlueViolet');
  },
};
