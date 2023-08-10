import { ChatClient } from "@twurple/chat";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { ApiClient } from "@twurple/api";
import { authProvider } from "twurple-auth";
import { initCommandHandler } from "./commands";
import { initEventHandler } from "./events";
import { initChannelRewardsHandler } from "./rewards";

console.log("Starting bot...");

const channelName = `${process.env.TWITCH_CHANNEL_NAME}`;

const chat = new ChatClient({ authProvider, channels: [channelName] });
chat.connect();

chat.onConnect(() => {
  console.log("Connected to chat");
  chat.say(channelName, "/me Tô na área! KonCha");
});

initCommandHandler(chat);

const apiClient = new ApiClient({ authProvider });
const eventSub = new EventSubWsListener({ apiClient });
eventSub.start();

initEventHandler(chat, eventSub);
initChannelRewardsHandler(chat, eventSub);
