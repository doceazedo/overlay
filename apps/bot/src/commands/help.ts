import { reply } from '../utils';
import { commands } from '.';
import type { Command } from '.';

export const help: Command = {
  aliases: ['help', 'ajuda', 'commands', 'comandos', 'cmd', 'cmds'],
  exec: async (input, args, user) => {
    const arr = commands.map((cmd) => `!${cmd.aliases?.[0]}`);
    const str = `comandos (${arr.length}): ${arr.join(', ')}`;
    reply(user, str);
  },
};
