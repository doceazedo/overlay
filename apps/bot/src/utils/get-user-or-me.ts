import { Userstate } from 'tmi.js';

export const getUserOrMe = (args: string[], user: Userstate) =>
  args.length ? args[0].replace('@', '') : user.username;
