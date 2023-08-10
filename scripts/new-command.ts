import { promises as fs, existsSync } from "fs";
import { confirm, input } from "@inquirer/prompts";
import select from "@inquirer/select";

const aliasesStr = await input({
  message: "Command name/alises (separate by space)",
});
const aliases = aliasesStr.split(" ");
if (!aliasesStr || !aliases.length) {
  console.log("You must inform at least one alias");
  process.exit();
}
const formattedAliases = `[${aliases.map((x) => `"${x}"`).join(", ")}]`;

const commandName = aliases[0];
const commandPath = `./apps/bot/src/commands/${commandName}.ts`;
if (existsSync(commandPath)) {
  console.log("This command already exists");
  process.exit();
}

const commandType = await select({
  message: "Command type",
  choices: [
    {
      name: "Reply message",
      value: "reply",
    },
    {
      name: "Custom script",
      value: "script",
    },
  ],
});

if (commandType == "reply") {
  const reply = await input({
    message: "Reply message",
    default: "Hello world!",
  });
  await fs.writeFile(
    commandPath,
    `import { createBotReply } from "../commands";

const ${commandName} = createBotReply(${formattedAliases}, "${reply}");

export default ${commandName};
`
  );
} else {
  await fs.writeFile(
    commandPath,
    `import { createBotCommand } from "../commands";

const ${commandName} = createBotCommand(${formattedAliases}, ({ reply }) => {
  const diceRoll = Math.floor(Math.random() * 6) + 1;
  reply(\`You rolled a \${diceRoll}\`);
});

export default ${commandName};
`
  );
}

console.log(`Command !${commandName} created successfuly 🎉`);
console.log(`You can edit it here: ${commandPath}`);
