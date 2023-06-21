import { MakeOptional } from "@d-fischer/shared-utils";
import { AccessToken, RefreshingAuthProvider } from "@twurple/auth";
import { CONFIG } from "config";
import { promises as fs } from "fs";

/*
 *  INIT CONFIG
 */

const { twitchClientId, twitchClientSecret, twitchBotId, twitchBroadcasterId } =
  CONFIG;

if (!twitchClientId) process.exit();
if (!twitchClientSecret) process.exit();
if (!twitchBotId) process.exit();
if (!twitchBroadcasterId) process.exit();

/*
 *  INIT AUTH PROVIDER
 */

let tokenData: MakeOptional<AccessToken, "accessToken" | "scope">;
try {
  const tokensFile = await fs.readFile(`../../tokens/${twitchBotId}.json`);
  tokenData = JSON.parse(tokensFile.toString());
} catch (error) {
  console.warn(`Missing token data file for user ID ${twitchBotId}`);
  console.warn("Shutting chatbot down...");
  process.exit();
}

const authProvider = new RefreshingAuthProvider({
  clientId: twitchClientId,
  clientSecret: twitchClientSecret,
  onRefresh: async (userId, newTokenData) =>
    await fs.writeFile(
      `../../tokens/${userId}.json`,
      JSON.stringify(newTokenData, null, 4)
    ),
});

export const getAuthProvider = async () => {
  const hasUsers =
    authProvider.hasUser(twitchBotId) &&
    authProvider.hasUser(twitchBroadcasterId);
  if (!hasUsers) {
    await authProvider.addUserForToken(tokenData, ["chat"]);
    // TODO: addUserForToken(broadcaster);
  }
  return authProvider;
};
