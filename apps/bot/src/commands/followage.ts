import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { getUserOrMe, reply, replyError } from '../utils';
import type { Command } from '.';
import { getFollows } from '../clients';
import 'dotenv/config';

const { TWITCH_CHANNEL } = process.env;

dayjs.extend(duration);

export const followage: Command = {
  aliases: [
    'followage',
    'follow',
    'following',
    'followingsince',
    'since',
    'seguindo',
  ],
  exec: async (input, args, user) => {
    const username = getUserOrMe(args, user);
    if (username == TWITCH_CHANNEL)
      return replyError(user, 'eu não sou TÃO narcisista assim 🙄');

    const who = username == user.username ? 'você' : username;
    const follows = await getFollows(username);
    if (!follows) return reply(user, 'essa pessoa (ainda) não me segue 🫣');

    const duration =
      new Date().getTime() - new Date(follows.followed_at).getTime();
    const followage = dayjs
      .duration(duration)
      .format('M [meses,] D [dias,] H [horas,] m [minutos e] s [segundos]');
    reply(user, `${who} segue há ${followage}`);
  },
};
