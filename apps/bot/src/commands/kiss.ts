import { send } from '../utils';
import { targetedCmd } from '../middlewares';
import type { Command } from '.';

export const kiss: Command = {
  aliases: ['kiss', 'beijo'],
  exec: (input, args, user) =>
    targetedCmd(input, args, user, (target) => {
      send(`@${user.username} beija ${target} <3`);
    })
};
