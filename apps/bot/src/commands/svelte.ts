import { reply } from '../utils';
import type { Command } from '.';

const postURL = 'https://doceazedo.com/blog/primeiros-passos-svelte';

export const svelte: Command = {
  aliases: ['svelte'],
  exec: async (input, args, user) => {
    reply(user, `tutorial de Svelte em Português 👉 ${postURL}`);
  },
};
