import { VM } from 'vm2';
import { reply, replyError } from '../utils';
import type { Command } from '.';

export const evaluate: Command = {
  aliases: ['eval', 'evaluate', 'run', 'js'],
  exec: async (input, args, user) => {
    const vm = new VM({
      timeout: 1000,
      allowAsync: false,
    });
    const cmd = args.join(' ');

    try {
      const output = vm.run(cmd);
      reply(user, output as string);
    } catch (error) {
      replyError(user, error as string);
    }
  },
};
