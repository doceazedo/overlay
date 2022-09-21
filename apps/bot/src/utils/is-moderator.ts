import type { ChatUserstate } from 'tmi.js';
import 'dotenv/config';

const { TWITCH_CHANNEL } = process.env;

export const isModerator = (user: ChatUserstate) =>
  user.mod || user.username === TWITCH_CHANNEL;
