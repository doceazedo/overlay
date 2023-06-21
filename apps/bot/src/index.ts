import { Bot, createBotCommand } from "@twurple/easy-bot";
import { getAuthProvider } from "twurple-auth";
import { CONFIG } from "config";

const { twitchChannelName } = CONFIG;

if (!twitchChannelName) process.exit();

const authProvider = await getAuthProvider();

const bot = new Bot(null, {
  authProvider,
  channels: [twitchChannelName],
  commands: [
    createBotCommand("dice", (params, { reply }) => {
      const diceRoll = Math.floor(Math.random() * 6) + 1;
      reply(`You rolled a ${diceRoll}`);
    }),
    createBotCommand("slap", (params, { userName, say }) => {
      say(
        `${userName} slaps ${params.join(" ")} around a bit with a large trout`
      );
    }),
  ],
});

bot.onConnect(() => {
  bot.say(twitchChannelName, "/me Tô na área! KonCha");
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
