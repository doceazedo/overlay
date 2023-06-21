import { type AccessToken, RefreshingAuthProvider } from "@twurple/auth";
import { CONFIG } from "config";
import { promises as fs } from "fs";
import type { MakeOptional } from "@d-fischer/shared-utils";

/*
 *  INIT CONFIG
 */

/*
 *  INIT AUTH PROVIDER
 */

let tokenData: MakeOptional<AccessToken, "accessToken" | "scope">;
try {
  const tokensFile = await fs.readFile(
    `../../tokens/${CONFIG.twitchBotId}.json`
  );
  tokenData = JSON.parse(tokensFile.toString());
} catch (error) {
  console.warn(`Missing token data file for user ID ${CONFIG.twitchBotId}`);
  console.warn("Shutting chatbot down...");
  process.exit();
}

let authProvider: RefreshingAuthProvider;

const newAuthProvider = async () => {
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

  if (CONFIG.twitchBotId && !authProvider.hasUser(CONFIG.twitchBotId))
    await authProvider.addUserForToken(tokenData, ["chat"]);
  // TODO: ^ same for broadcaster

  return authProvider;
};
