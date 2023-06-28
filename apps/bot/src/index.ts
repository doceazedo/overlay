import { Bot, createBotCommand } from "@twurple/easy-bot";
import { getAuthProvider } from "twurple-auth";
import { CONFIG } from "config";
import { commandsDB } from "db";

const { twitchChannelName } = CONFIG;

if (!twitchChannelName) process.exit();

const authProvider = await getAuthProvider();
if (!authProvider) throw Error("No auth provider");

await commandsDB.read();
const botCommands = commandsDB.data.commands
  .map((cmd) => {
    const aliases = cmd.aliases?.length
      ? [cmd.name, ...cmd.aliases]
      : [cmd.name];
    return aliases.map((alias) => {
      return createBotCommand(alias, async (params, ctx) => {
        const message = cmd.reply || cmd.say;
        const parsedMessage =
          message &&
          message
            .replace("%username%", ctx.userDisplayName)
            .replace("%params%", params.join(" "));

        if (cmd.reply && parsedMessage) ctx.reply(parsedMessage);
        if (cmd.say && parsedMessage) ctx.reply(parsedMessage);
        if (cmd.script) {
          const module = await import(`../../data/scripts/${alias}`);
          module.default(params, ctx);
        }
      });
    });
  })
  .flat();

const bot = new Bot(null, {
  authProvider,
  channels: [twitchChannelName],
  commands: botCommands,
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
