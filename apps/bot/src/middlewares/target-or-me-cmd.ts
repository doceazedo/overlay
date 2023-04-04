import type { ChatUserstate } from 'tmi.js';

export const targetOrMeCmd = (
  args: string[],
  user: ChatUserstate,
  exec: (target: string, self: boolean) => void
) => {
  const self = !args.length;
  const target = self ? user['display-name'] || 'unknown' : args[0].replace('@', '');
  exec(target, self);
}
