import { promises as fs } from "fs";
import { type AccessToken, RefreshingAuthProvider } from "@twurple/auth";
import type { MakeOptional } from "@d-fischer/shared-utils";

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

export const authProvider = new RefreshingAuthProvider({
  clientId: `${process.env.TWITCH_CLIENT_ID}`,
  clientSecret: `${process.env.TWITCH_CLIENT_SECRET}`,
  onRefresh: async (userId, newTokenData) =>
    await fs.writeFile(
      `../../tokens/${userId}.json`,
      JSON.stringify(newTokenData, null, 4)
    ),
});

const botTokenData = await getTokenData(process.env.PUBLIC_TWITCH_BOT_ID);
const broadcasterTokenData = await getTokenData(
  process.env.PUBLIC_TWITCH_BROADCASTER_ID
);

await authProvider.addUserForToken(botTokenData, ["chat"]);
await authProvider.addUserForToken(broadcasterTokenData);
