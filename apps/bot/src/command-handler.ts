import { commands } from './commands';
import { replyError, loggr } from './utils';
import type { ChatUserstate } from 'tmi.js';

const commandHandler = (
  channel: string,
  user: ChatUserstate,
  message: string
) => {
  const args = message.split(' ');
  const input = args.shift()?.substring(1).toLowerCase() || '';

  const command = commands.find((cmd) => cmd.aliases?.includes(input));
  if (!command) {
    replyError(user, `não conheço esse comando "${input}" 😔`);
    loggr.warn(`${user.username} tried to run unknown command "${input}"`);
    return;
  }

  try {
    command.exec(input, args, user);
    loggr.info(`${user.username} issued command "${input}"`);
  } catch (error) {
    loggr.error(
      `An error occurred when ${user.username} tried to issue command "${input}"`
    );
    console.log(error);
  }
};

export default commandHandler;
