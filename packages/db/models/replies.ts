import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export type RepliesData = {
  currentProject: string;
};

const adapter = new JSONFile<RepliesData>("../../data/replies.json");
export const replies = new Low<RepliesData>(adapter, { currentProject: "" });
