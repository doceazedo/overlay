import { replyError } from '../utils';
import type { ChatUserstate } from 'tmi.js';

export const targetedCmd = (
  input: string,
  args: string[],
  user: ChatUserstate,
  exec: (target: string) => void
) => {
  if (!args.length) return replyError(user, `use: !${input} @alguem`);
  const target = args.join(' ');
  exec(target);
}
