import { send } from '../utils';
import { targetedCmd } from '../middlewares';
import type { Command } from '.';

export const xxx: Command = {
  aliases: ['xxx'],
  exec: (input, args, user) =>
    targetedCmd(input, args, user, (target) => {
      send(
        `@${user.username} ama ${target}... excessivamente... aqui não @${user.username}... tem crianças aqui.`
      );
    })
};
