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

const adapter = new JSONFile<Data>("../../data/commands.json");
export const commands = new Low<Data>(adapter, { commands: [] });
