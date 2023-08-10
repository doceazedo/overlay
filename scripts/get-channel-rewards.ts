import { trpc } from "trpc-client";

const { rewards } = await trpc.twitch.getChannelRewards.query({
  id: `${process.env.PUBLIC_TWITCH_BROADCASTER_ID}`,
});
console.log(rewards);
