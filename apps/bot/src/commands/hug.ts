import { send } from '../utils';
import { targetedCmd } from '../middlewares';
import type { Command } from '.';

export const hug: Command = {
  aliases: ['hug', 'abraço'],
  exec: (input, args, user) =>
    targetedCmd(input, args, user, (target) => {
      send(`@${user.username} abraça ${target} <3`);
    })
};
