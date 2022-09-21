import { reply } from '../utils';
import type { Command } from '.';

export const pix: Command = {
  aliases: ['pix'],
  exec: async (input, args, user) =>
    reply(user, 'Minha chave Pix é: 4480693e-1273-4941-aacc-5840697aee42'),
};
