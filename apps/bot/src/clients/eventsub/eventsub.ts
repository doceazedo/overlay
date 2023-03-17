import { StaticAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { EventSubWsListener } from '@twurple/eventsub-ws';
import 'dotenv/config';

const clientId = process.env.TWITCH_CLIENT_ID || '';
const accessToken = process.env.TWITCH_BROADCASTER_ACCESS_TOKEN || '';

const authProvider = new StaticAuthProvider(clientId, accessToken);
const apiClient = new ApiClient({ authProvider });
let eventSubClient: EventSubWsListener;

export const getEventSubClient = async () => {
  if (eventSubClient != null) return eventSubClient;
  await apiClient.eventSub.deleteAllSubscriptions();
  eventSubClient = new EventSubWsListener({
    apiClient,
  });
  return eventSubClient;
};
