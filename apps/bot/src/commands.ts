import { promises as fs } from "fs";
import { ChatClient } from "@twurple/chat";
import { replies, type RepliesData } from "db/models/replies";
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
  isModOnly?: boolean;
};

export const createBotCommand = (
  aliases: string[],
  handler: CommandHandler,
  isModOnly = false
): BotCommand => ({
  aliases,
  handler,
  isModOnly,
});

export const createBotReply = (aliases: string[], message: string | string[]) =>
  createBotCommand(aliases, ({ reply, say }) => {
    if (typeof message === "string") return reply(message);
    message.map((line) => say(line));
  });

export const createBotDynamicReply = (
  aliases: string[],
  key: keyof RepliesData
) =>
  createBotCommand(aliases, async ({ reply, params, msg }) => {
    await replies.read();
    if (params.length && (msg.userInfo.isMod || msg.userInfo.isBroadcaster)) {
      replies.data[key] = params.join(" ");
      await replies.write();
      return reply("Comando atualizado! SeemsGood");
    }
    const message = replies.data[key];
    reply(message);
  });

const commandsDir = "./src/commands";
const commandFiles = await fs.readdir(commandsDir);

export const commands = await Promise.all(
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
    if (cmd) {
      if (cmd.isModOnly && !msg.userInfo.isMod && !msg.userInfo.isBroadcaster)
        return ctx.reply("Somente mods podem usar esse comando! NotLikeThis");
      console.log(text);
      cmd.handler(ctx);
    }
  });

  console.log(`Loaded ${commands.length} commands`);
};
