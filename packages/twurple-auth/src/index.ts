import { type AccessToken, RefreshingAuthProvider } from "@twurple/auth";
import { CONFIG } from "config";
import { promises as fs } from "fs";
import type { MakeOptional } from "@d-fischer/shared-utils";
import { botScopes, broadcasterScopes } from "../scopes";

/*
 *  INIT CONFIG
 */

/*
 *  INIT AUTH PROVIDER
 */

const getTokenData = async (
  id?: string
): Promise<MakeOptional<AccessToken, "accessToken" | "scope">> => {
  try {
    const tokensFile = await fs.readFile(`../../tokens/${id}.json`);
    return JSON.parse(tokensFile.toString());
  } catch (error) {
    console.warn(`Missing token data file for user ID ${id}`);
    console.warn("Shutting chatbot down...");
    process.exit();
  }
};

const botTokenData = await getTokenData(CONFIG.twitchBotId);
const broadcasterTokenData = await getTokenData(CONFIG.twitchBroadcasterId);

let authProvider: RefreshingAuthProvider;

const newAuthProvider = () => {
  if (!CONFIG.twitchClientId || !CONFIG.twitchClientSecret) return;

  authProvider = new RefreshingAuthProvider({
    clientId: CONFIG.twitchClientId,
    clientSecret: CONFIG.twitchClientSecret,
    onRefresh: async (userId, newTokenData) =>
      await fs.writeFile(
        `../../tokens/${userId}.json`,
        JSON.stringify(newTokenData, null, 4)
      ),
  });
};

export const getAuthProvider = async () => {
  if (!authProvider) newAuthProvider();
  if (!authProvider) return null;

  if (CONFIG.twitchBotId && !authProvider.hasUser(CONFIG.twitchBotId)) {
    await authProvider.addUserForToken(botTokenData, ["chat"]);
    console.log("Added BOT token");
  }

  if (
    CONFIG.twitchBroadcasterId &&
    !authProvider.hasUser(CONFIG.twitchBroadcasterId)
  ) {
    await authProvider.addUserForToken(broadcasterTokenData);
    console.log("Added BROADCASTER token");
  }

  return authProvider;
};
