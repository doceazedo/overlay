import { StaticAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { EventSubWsListener } from '@twurple/eventsub-ws';
import 'dotenv/config';

const clientId = process.env.TWITCH_CLIENT_ID || '';
const broadcasterAccessToken = process.env.TWITCH_BROADCASTER_ACCESS_TOKEN || '';
const botAccessToken = process.env.TWITCH_BOT_ACCESS_TOKEN || '';

const broadcasterAuthProvider = new StaticAuthProvider(clientId, broadcasterAccessToken);
export const broadcasterApiClient = new ApiClient({ authProvider: broadcasterAuthProvider });

const botAuthProvider = new StaticAuthProvider(clientId, botAccessToken);
export const botApiClient = new ApiClient({ authProvider: botAuthProvider });

let eventSubClient: EventSubWsListener;
export const getEventSubClient = async () => {
  if (eventSubClient != null) return eventSubClient;
  await broadcasterApiClient.eventSub.deleteAllSubscriptions();
  eventSubClient = new EventSubWsListener({
    apiClient: broadcasterApiClient,
  });
  return eventSubClient;
};
