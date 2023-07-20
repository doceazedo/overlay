import { promises as fs } from "fs";
import { ChatClient } from "@twurple/chat";
import type { TwitchPrivateMessage } from "@twurple/chat/lib/commands/TwitchPrivateMessage";

type CommandContext = {
  cmd: string;
  params: string[];
  user: string;
  msg: TwitchPrivateMessage;
  say: (text: string) => Promise<void>;
  reply: (text: string) => Promise<void>;
};

type CommandHandler = (ctx: CommandContext) => void;

type BotCommand = {
  aliases: string[];
  handler: CommandHandler;
};

export const createBotCommand = (
  aliases: string[],
  handler: CommandHandler
): BotCommand => ({
  aliases,
  handler,
});

const commandsDir = "./src/commands";
const commandFiles = await fs.readdir(commandsDir);
const commands = await Promise.all(
  commandFiles.map(async (file) => {
    const module = await import(`${commandsDir}/${file}`);
    return module.default as BotCommand;
  })
);

export const initCommandHandler = (chat: ChatClient) => {
  chat.onMessage((channel, user, text, msg) => {
    if (msg.userInfo.userId == process.env.PUBLIC_TWITCH_BOT_ID) return;
    if (!text.startsWith("!")) return;

    const ctx: CommandContext = {
      cmd: text.split(" ")[0].slice(1),
      params: text.split(" ").slice(1),
      user,
      msg,
      say: (text: string) => chat.say(channel, text),
      reply: (text: string) => chat.say(channel, text, { replyTo: msg }),
    };
    const cmd = commands.find((x) => x.aliases.includes(ctx.cmd));
    if (cmd) cmd.handler(ctx);
  });

  console.log(`Loaded ${commands.length} commands`);
};
