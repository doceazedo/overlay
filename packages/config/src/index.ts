import fs from "fs";

type ConfigData = {
  trpcServerPort?: number;
  twitchClientId?: string;
  twitchClientSecret?: string;
  twitchBroadcasterId?: string;
  twitchBotId?: string;
  twitchChannelName?: string;
  spotifyClientId?: string;
  spotifyClientSecret?: string;
  spotifyRefreshToken?: string;
};

type Config = ConfigData & {
  update: (data: ConfigData) => Promise<void>;
};

const CONFIG_FILE_PATH = "../../config.json";

export const refreshConfigFile = async () => {
  const configFile = await fs.promises.readFile(CONFIG_FILE_PATH);
  CONFIG = JSON.parse(configFile.toString());
};

export const update = async (data: ConfigData) => {
  configData = {
    ...configData,
    ...data,
  };
  CONFIG = {
    ...CONFIG,
    ...configData,
  };
  await fs.promises.writeFile(
    CONFIG_FILE_PATH,
    JSON.stringify(configData, null, 2)
  );
};

const configFile = fs.readFileSync(CONFIG_FILE_PATH);
let configData = JSON.parse(configFile.toString());

export let CONFIG: Config = {
  ...configData,
  update,
};
