import { send } from '../utils';
import type { Command } from '.';

const cooldown = 60000;

let peeCount = 0;
let lastUsage = new Date(0);

export const xixi: Command = {
  aliases: ['xixi', 'banheiro', 'pee'],
  exec: async () => {
    const now = new Date();
    if (now.getTime() - lastUsage.getTime() > cooldown) {
      peeCount++;
      lastUsage = now;
    }

    if (peeCount == 1)
      return send(
        `É a primeira vez que o Doce vai no banheiro hoje (tava demorando) 🚽`
      );

    send(`Doce já foi no banheiro ${peeCount} vezes hoje 🚽`);
  },
};
