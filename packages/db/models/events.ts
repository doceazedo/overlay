import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import type { Action } from "../actions";

export type EventData = {
  event: string;
  actions: Action[];
};

type Data = {
  events: EventData[];
};

const adapter = new JSONFile<Data>("../../data/events.json");
export const events = new Low<Data>(adapter, { events: [] });
