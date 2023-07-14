import { promises as fs } from "fs";
import { Bot, BotCommand } from "@twurple/easy-bot";
import { EventSubWsListener } from "@twurple/eventsub-ws";
import { ApiClient } from "@twurple/api";
import { authProvider } from "./auth";

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

bot.onSub(({ broadcasterName, userName }) => {
  bot.say(
    broadcasterName,
    `Thanks to @${userName} for subscribing to the channel!`
  );
});

bot.onResub(({ broadcasterName, userName, months }) => {
  bot.say(
    broadcasterName,
    `Thanks to @${userName} for subscribing to the channel for a total of ${months} months!`
  );
});

bot.onSubGift(({ broadcasterName, gifterName, userName }) => {
  bot.say(
    broadcasterName,
    `Thanks to @${gifterName} for gifting a subscription to @${userName}!`
  );
});

const apiClient = new ApiClient({ authProvider });

const eventsub = new EventSubWsListener({ apiClient });
eventsub.start();

const broadcasterId = `${process.env.TWITCH_BROADCASTER_ID}`;
eventsub.onChannelFollow(broadcasterId, broadcasterId, (e) => {
  console.log(`thx for the follow, ${e.userDisplayName}!!`);
});
