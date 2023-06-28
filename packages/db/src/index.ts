import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export type CommandData = {
  name: string;
  aliases?: string[];
  reply?: string;
  say?: string;
  script?: boolean;
};

type Data = {
  commands: CommandData[];
};

const COMMANDS_FILE_PATH = "../../data/commands.json";

const adapter = new JSONFile<Data>(COMMANDS_FILE_PATH);
const defaultData = { commands: [] };
export const commandsDB = new Low<Data>(adapter, defaultData);
