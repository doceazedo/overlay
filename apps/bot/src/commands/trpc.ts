import { trpc as client } from 'trpc-client';
import { reply } from '../utils';
import type { Command } from '.';

export const trpc: Command = {
  aliases: ['trpc'],
  exec: async (input, args, user) => {
    const sla = await client.userCreate.mutate({ name: 'Doce' });
    reply(user, `Resp: ${JSON.stringify(sla)}`);
  },
};
