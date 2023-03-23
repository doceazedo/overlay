import { tmiClient, botApiClient } from '../clients';
import 'dotenv/config';
import type { Userstate } from 'tmi.js';
import type { HelixChatUserColor } from '@twurple/api/lib';

const userId = process.env.TWITCH_BOT_ID || '';
const channel = process.env.TWITCH_CHANNEL || '';
const maxLength = 440;

let currentColor: HelixChatUserColor;

const trim = (str: string, length = maxLength) =>
  str.length > length ? str.substring(0, length - 3) + '...' : str;

export const send = async (str: string, color: HelixChatUserColor = 'spring_green') => {
  const trimmedMessage = trim(str);
  if (color != currentColor) await botApiClient.chat.setColorForUser(userId, color);
  currentColor = color;
  tmiClient.say(channel, trimmedMessage);
};

export const reply = (
  user: Userstate,
  str: string,
  color: HelixChatUserColor = 'spring_green'
) => {
  send(`@${user.username}, ${str}`, color);
};

export const sendError = (str: string) => {
  send(str, 'red');
};

export const replyError = (user: Userstate, str: string) => {
  send(`/me @${user.username}, ${str}`, 'red');
};

export const sendStriped = async (msgs: string[], color1: HelixChatUserColor, color2: HelixChatUserColor) => {
  let i = 0;
  for (const msg of msgs) {
    const color = (i + 1) % 2 == 0 ? color1 : color2;
    await send(`/me ${msg}`, color);
    i++;
  }
};

export const sendMultiple = async (msgs: string[], color: HelixChatUserColor = 'spring_green') => {
  for (const msg of msgs) {
    await send(`/me ${msg}`, color);
  }
};