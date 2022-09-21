import { randomInRange } from '$lib/utils';
import { messages } from '.';

let lastMessage = '';

export const getRandomMessage = () => {
  const msg =
    messages[Math.floor(randomInRange(0, messages.length - 1))] + '...';
  if (lastMessage == msg) return getRandomMessage();
  lastMessage = msg;
  return msg;
};
