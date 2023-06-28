import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

type Data = {
  commands: {
    name: string;
    aliases?: string[];
    reply?: string;
    say?: string;
    script?: boolean;
  }[];
};

const COMMANDS_FILE_PATH = "../../data/commands.json";

const adapter = new JSONFile<Data>(COMMANDS_FILE_PATH);
const defaultData = { commands: [] };
export const commandsDB = new Low<Data>(adapter, defaultData);
