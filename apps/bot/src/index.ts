import { Bot, createBotCommand } from "@twurple/easy-bot";
import { getAuthProvider } from "twurple-auth";
import { VM } from "vm2";
import { CONFIG } from "config";
import { commands } from "db/models/commands";
import { incrementVariable, variables } from "db/models/variables";
import { parseMessageTemplate } from "utils/parse-message-template";

const { twitchChannelName } = CONFIG;

if (!twitchChannelName) process.exit();

const authProvider = await getAuthProvider();
if (!authProvider) throw Error("No auth provider");

await commands.read();
const botCommands = commands.data.commands
  .map((cmd) => {
    const aliases = cmd.aliases?.length
      ? [cmd.name, ...cmd.aliases]
      : [cmd.name];
    return aliases.map((alias) => {
      return createBotCommand(alias, async (params, ctx) => {
        if (cmd.script) {
          const module = await import(`../../data/scripts/${alias}`);
          module.default(params, ctx);
        }

        const message = cmd.reply || cmd.say;
        if (!message) return;

        await variables.read();
        const vm = new VM({
          timeout: 100,
          allowAsync: false,
          sandbox: {
            broadcasterId: ctx.broadcasterId,
            broadcasterName: ctx.broadcasterName,
            userId: ctx.userId,
            userName: ctx.userName,
            userDisplayName: ctx.userDisplayName,
            ...variables.data.variables.reduce((result, item) => {
              result[item.key] = item.value;
              return result;
            }, {}),
          },
        });

        const parsedMessage = (
          await Promise.all(
            parseMessageTemplate(message).map(async (x) => {
              if (x.type == "text") return x;
              if (!x.value.trim().startsWith("++")) return x;
              const value = await incrementVariable(x.value.trim().slice(2));
              if (!value) return x;
              return {
                value: `${value}`,
                type: "text",
              };
            })
          )
        )
          .map((x) => {
            if (x.type == "text") return x.value;
            try {
              const output = vm.run(x.value);
              return output;
            } catch (error) {
              return `{{${x.value}}}`;
            }
          })
          .join("");

        if (cmd.reply && parsedMessage) ctx.reply(parsedMessage);
        if (cmd.say && parsedMessage) ctx.reply(parsedMessage);
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
