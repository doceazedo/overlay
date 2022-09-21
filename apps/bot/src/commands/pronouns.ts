import { reply, replyError } from '../utils';
import { updateUser } from '../clients/overlay';
import type { Command } from '.';

export const pronouns: Command = {
  aliases: ['pronouns', 'pronoun', 'pronomes', 'pronome'],
  exec: async (input, args, user) => {
    const usageMsg =
      'você pode mandar um ou dois pronomes, dentre "ela", "ele" e "elu" 😉';

    if (!args.length) return replyError(user, usageMsg);

    let [primary, secondary] = args;

    const splitPronouns = args[0].split('/');
    if (splitPronouns.length == 2) [primary, secondary] = splitPronouns;

    const primaryPronouns = ['ele', 'ela', 'elu'];
    const secondaryPronouns = ['dele', 'dela', 'delu'];

    if (
      !primary ||
      !primaryPronouns.includes(primary) ||
      (secondary &&
        !primaryPronouns.includes(secondary) &&
        !secondaryPronouns.includes(secondary))
    )
      return replyError(user, usageMsg);

    if (!secondary) secondary = `d${primary}`;
    if (primaryPronouns.includes(secondary)) secondary = `d${secondary}`;

    const userId = user['user-id'] as string;
    const pronounsStr = `${primary}/${secondary}`;
    await updateUser(userId, {
      pronouns: pronounsStr,
    });

    reply(user, `vou me lembrar que seus pronomes são ${pronounsStr} 🥰`);
  },
};
