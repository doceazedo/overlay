import { MakeOptional } from "@d-fischer/shared-utils";
import { AccessToken, RefreshingAuthProvider } from "@twurple/auth";
import { Bot, createBotCommand } from "@twurple/easy-bot";
import { promises as fs } from "fs";

/*
 *  INIT .ENV CONFIG
 */

const {
  TWITCH_CLIENT_ID,
  TWITCH_CLIENT_SECRET,
  TWITCH_BOT_ID,
  TWITCH_CHANNEL_NAME,
} = process.env;

const missingConfigKeys = [
  ["TWITCH_CLIENT_ID", TWITCH_CLIENT_ID],
  ["TWITCH_CLIENT_SECRET", TWITCH_CLIENT_SECRET],
  ["TWITCH_BOT_ID", TWITCH_BOT_ID],
  ["TWITCH_CHANNEL_NAME", TWITCH_CHANNEL_NAME],
]
  .filter(([key, value]) => !value)
  .map(([key]) => key);
if (missingConfigKeys.length) {
  missingConfigKeys.map((key) => console.warn(`Missing ${key} config key`));
  console.warn("Shutting chatbot down...");
  process.exit();
}

if (!TWITCH_CLIENT_ID) process.exit(1);
if (!TWITCH_CLIENT_SECRET) process.exit(1);
if (!TWITCH_BOT_ID) process.exit(1);
if (!TWITCH_CHANNEL_NAME) process.exit(1);

/*
 *  INIT CHAT BOT
 */

let tokenData: MakeOptional<AccessToken, "accessToken" | "scope">;
try {
  const tokensFile = await fs.readFile(`../../tokens/${TWITCH_BOT_ID}.json`);
  tokenData = JSON.parse(tokensFile.toString());
} catch (error) {
  console.warn(`Missing token data file for user ID ${TWITCH_BOT_ID}`);
  console.warn("Shutting chatbot down...");
  process.exit();
}

const authProvider = new RefreshingAuthProvider({
  clientId: TWITCH_CLIENT_ID,
  clientSecret: TWITCH_CLIENT_SECRET,
  onRefresh: async (userId, newTokenData) =>
    await fs.writeFile(
      `../../tokens/${userId}.json`,
      JSON.stringify(newTokenData, null, 4)
    ),
});

await authProvider.addUserForToken(tokenData, ["chat"]);

const bot = new Bot(null, {
  authProvider,
  channels: ["doceazedo911"],
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
  bot.say(TWITCH_CHANNEL_NAME, "/me Tô na área! KonCha");
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
