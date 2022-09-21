import tmi from 'tmi.js';
import 'dotenv/config';

const { TWITCH_CHANNEL, TWITCH_LOGIN, TWITCH_OAUTH_TOKEN } = process.env;

export const tmiClient = new tmi.Client({
  identity: {
    username: TWITCH_LOGIN,
    password: TWITCH_OAUTH_TOKEN,
  },
  channels: [TWITCH_CHANNEL || ''],
});
