import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

type Data = {
  first?: {
    displayName: string;
    redeemedAt: string;
  };
  ranking: {
    [id: string]: number;
  };
};

const adapter = new JSONFile<Data>("../../data/first.json");
export const first = new Low<Data>(adapter, { ranking: {} });
