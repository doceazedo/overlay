import { isModerator, replyError } from '../utils';
import type { ChatUserstate } from 'tmi.js';

export const modOnlyCmd = (user: ChatUserstate, exec: () => void) => {
  if (isModerator(user)) return exec();
  replyError(user, 'somente mods podem usar esse comando 🤭');
}
