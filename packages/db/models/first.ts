import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

type FirstData = {
  first?: {
    displayName: string;
    redeemedAt: string;
  };
  ranking: {
    [id: string]: number;
  };
};

const adapter = new JSONFile<FirstData>("../../data/first.json");
export const first = new Low<FirstData>(adapter, { ranking: {} });
