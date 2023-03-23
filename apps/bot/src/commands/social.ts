import { sendMultiple } from '../utils';
import type { Command } from '.';

const socialsArr = [
  '🐙 GitHub: https://github.com/doceazedo',
  '🐤 Twitter: https://twitter.com/doceazedo911',
  '🐘 Mastodon: https://svelte.gay/@doceazedo',
  '📸 Instagram: https://instagram.com/doceazedo911',
  '💬 Discord: https://discord.gg/vEGRe2kq8B',
  '🎵 Lastfm: https://last.fm/user/doceazedo911',
];

export const social: Command = {
  aliases: ['social', 'socials', 'redes', 'github', 'gh', 'twitter', 'tt', 'mastodon', 'instagram', 'insta', 'ig', 'lastfm'],
  exec: async () => sendMultiple(socialsArr),
};
