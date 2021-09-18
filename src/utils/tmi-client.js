import { TWITCH_BOT_LOGIN, TWITCH_BOT_OAUTH_TOKEN, TWITCH_CHANNEL } from '../env';

const tmiClient = new window.tmi.Client({
  identity: {
    username: TWITCH_BOT_LOGIN,
    password: `oauth:${TWITCH_BOT_OAUTH_TOKEN}`
  },
  channels: [ TWITCH_CHANNEL ]
});

export default tmiClient;