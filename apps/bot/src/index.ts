import { promises as fs } from "fs";
import { Bot, BotCommand } from "@twurple/easy-bot";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { ApiClient } from "@twurple/api";
import { authProvider } from "twurple-auth";
import { initEventHandler } from "./events";

console.log("Starting bot...");

const channelName = `${process.env.TWITCH_CHANNEL_NAME}`;

const commandsDir = "./src/commands";
const commandFiles = await fs.readdir(commandsDir);
const commands = await Promise.all(
  commandFiles.map(async (file) => {
    const module = await import(`${commandsDir}/${file}`);
    return module.default as BotCommand;
  })
);

console.log(`Loaded ${commands.length} commands`);

const bot = new Bot({
  authProvider,
  channels: [channelName],
  commands,
});

bot.onConnect(() => {
  console.log("Connected to chat");
  bot.say(channelName, "/me Tô na área! KonCha");
});

const apiClient = new ApiClient({ authProvider });
const eventSub = new EventSubWsListener({ apiClient });
eventSub.start();

initEventHandler(bot, eventSub);
