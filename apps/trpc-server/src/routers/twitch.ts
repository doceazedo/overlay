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
  getStreamViewers: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const stream = await apiClient.streams.getStreamByUserId(input.id);
      return {
        viewers: stream?.viewers || 0,
      };
    }),
  getChannelRewards: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const customRewards = await apiClient.channelPoints.getCustomRewards(
        input.id
      );
      const rewards = customRewards.map((x) => ({
        id: x.id,
        title: x.title,
      }));

      return {
        rewards,
      };
    }),
});
