import fs from "fs";

const args = process.argv.slice(2);
if (!args.length) throw Error("You must pass a command name");

const command = args[0].toLowerCase();
const commandFilePath = `apps/bot/src/commands/${command}.ts`;

const commandExists = fs.existsSync(commandFilePath);
if (commandExists) throw Error(`Command '${command}' already exists`);

const aliases = args.map((alias) => `'${alias.toLowerCase()}'`).join(", ");

fs.writeFileSync(
  commandFilePath,
  `import { reply } from '../utils';
import type { Command } from '.';

export const ${command}: Command = {
  aliases: [${aliases}],
  exec: async (input, args, user) => {
    reply(user, 'Hello ${command}!');
  },
};`
);

const commandsIndexFilePath = "apps/bot/src/commands/index.ts";
const commandsIndex = fs.readFileSync(commandsIndexFilePath).toString();

const commandImports = [
  ...commandsIndex.split("\n").filter((line) => line.startsWith("import {")),
  `import { ${command} } from './${command}';`,
].sort((a, b) => a.localeCompare(b));

const commandExports = [
  ...commandsIndex
    .split("export const commands: Command[] = [")[1]
    .split("\n")
    .filter((line) => line.startsWith("  ")),
  `  ${command},`,
].sort((a, b) => a.localeCompare(b));

const importsAt = commandsIndex
  .split("\n")
  .findIndex((line) => line.startsWith("import {"));

let updatedFile = commandsIndex
  .split("\n")
  .filter((line) => !line.startsWith("import {"));
updatedFile.splice(importsAt, 0, ...commandImports);

const exportsAt =
  updatedFile.findIndex((line) => line.startsWith("export const commands")) + 1;
updatedFile = updatedFile.filter(
  (line, i) => !(i >= exportsAt && line.startsWith("  "))
);
updatedFile.splice(exportsAt, 0, ...commandExports);

fs.writeFileSync(commandsIndexFilePath, updatedFile.join("\n"));
console.log(`Command '${command}' created successfully! 🎉`);
console.log(`File: ${commandFilePath}`);
