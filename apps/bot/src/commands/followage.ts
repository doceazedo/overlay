import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { reply, replyError } from '../utils';
import type { Command } from '.';
import { getFollows } from '../clients';
import 'dotenv/config';
import { targetOrMeCmd } from '../middlewares';

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
  exec: (input, args, user) =>
    targetOrMeCmd(args, user, async (target, self) => {
      if (target == TWITCH_CHANNEL)
        return replyError(user, 'eu não sou TÃO narcisista assim 🙄');
  
      const who = self ? 'você' : target;
      const follows = await getFollows(target);
      if (!follows) return reply(user, 'essa pessoa (ainda) não me segue 🫣');
  
      const duration =
        new Date().getTime() - new Date(follows.followed_at).getTime();
      const followage = dayjs
        .duration(duration)
        .format('Y [anos,] M [meses,] D [dias,] H [horas,] m [minutos e] s [segundos]');
      reply(user, `${who} segue há ${followage}`);
    })
};
