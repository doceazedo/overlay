import { send } from '../../utils';
import { lurkers } from '../../stores/lurk';
import type { MessageEvent } from '.';

export const lurk: MessageEvent = async (message, isCommand, user) => {
  if (!user['user-id']) return;

  const isLurking = lurkers.has(user['user-id']);
  if (!isLurking) return;

  lurkers.delete(user['user-id']);
  send(`Oi, ${user.username}! Que bom te ver de volta! doceazHey`);
}
