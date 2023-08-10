import { commands, createBotCommand } from "../commands";

const help = createBotCommand(
  ["help", "ajuda", "comandos", "commands", "cmd"],
  ({ reply }) => {
    const commandsList = commands.map((x) => `!${x.aliases[0]}`).join(", ");
    reply(`Comandos (${commands.length}): ${commandsList}`);
  }
);

export default help;
