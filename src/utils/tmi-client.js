import { browser } from '$app/env';
import { TWITCH_BOT_LOGIN, TWITCH_BOT_OAUTH_TOKEN, TWITCH_CHANNEL } from '../env';

export default function tmiClient () {
  if (!browser) return;
  return new window.tmi.Client({
    identity: {
      username: TWITCH_BOT_LOGIN,
      password: `oauth:${TWITCH_BOT_OAUTH_TOKEN}`
    },
    channels: [ TWITCH_CHANNEL ]
  });
}