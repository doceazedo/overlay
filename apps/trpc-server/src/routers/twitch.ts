import z from "zod";
import { ApiClient } from "@twurple/api";
import { authProvider } from "twurple-auth";
import { publicProcedure, router } from "../trpc";

const apiClient = new ApiClient({ authProvider });

export const twitchRouter = router({
  getStreamStats: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const stream = await apiClient.streams.getStreamByUserId(input.id);
      const followers = await apiClient.channels.getChannelFollowerCount(
        input.id
      );
      const subscriptions = await apiClient.subscriptions.getSubscriptions(
        input.id
      );

      return {
        followers,
        subscriptions: subscriptions.total,
        viewers: stream?.viewers || 0,
      };
    }),
});
