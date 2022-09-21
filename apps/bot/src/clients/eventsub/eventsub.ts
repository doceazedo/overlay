import { ClientCredentialsAuthProvider } from '@twurple/auth';
import { ApiClient } from '@twurple/api';
import { EventSubListener } from '@twurple/eventsub';
import { NgrokAdapter } from '@twurple/eventsub-ngrok';
import 'dotenv/config';

const clientId = process.env.TWITCH_CLIENT_ID || '';
const clientSecret = process.env.TWITCH_CLIENT_SECRET || '';
const eventsubSecret = process.env.TWITCH_EVENTSUB_SECRET || '';

const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);
const apiClient = new ApiClient({ authProvider });
let eventSubClient: EventSubListener;

export const getEventSubClient = async () => {
  if (eventSubClient != null) return eventSubClient;
  await apiClient.eventSub.deleteAllSubscriptions();
  eventSubClient = new EventSubListener({
    apiClient,
    adapter: new NgrokAdapter(),
    secret: eventsubSecret,
    strictHostCheck: true,
  });
  return eventSubClient;
};
