import { getRSSFeed } from '../clients/doceazedo';
import { reply } from '../utils';
import type { Command } from '.';

const blogURL = 'https://doceazedo.com/blog';

export const blog: Command = {
  aliases: ['blog'],
  exec: async (input, args, user) => {
    const feed = await getRSSFeed();
    const lastPost = feed?.rss?.channel?.item?.[0];

    if (!lastPost) reply(user, `leia o meu blog em ${blogURL} 📰`);
    reply(user, `leia "${lastPost.title}" em ${lastPost.link} 📰`);
  },
};
