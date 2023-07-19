import z from "zod";
import { TRPCError } from "@trpc/server";
import { Client } from "spotify-api.js";
import { publicProcedure, router } from "../trpc";

const spotify = new Client({
  token: {
    clientID: `${process.env.SPOTIFY_CLIENT_ID}`,
    clientSecret: `${process.env.SPOTIFY_CLIENT_SECRET}`,
    refreshToken: `${process.env.SPOTIFY_REFRESH_TOKEN}`,
  },
});

export const spotifyApiRouter = router({
  findFirstTrack: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async ({ input }) => {
      const possiblyAnID =
        input.query.split("track:")?.[1] || // uri
        input.query.split("track/")?.[1]?.split("?")?.[0] || // url
        input.query; // id

      try {
        const track = await spotify.tracks.get(possiblyAnID);
        if (track) return track;
      } catch (e) {}

      try {
        const tracks = await spotify.tracks.search(input.query);
        if (tracks.length) return tracks[0];
      } catch (e) {}

      return null;
    }),
  queueTrack: publicProcedure
    .input(z.object({ uri: z.string() }))
    .query(async ({ input }) => {
      const queuedTrack = await spotify.user.player.addItem(input.uri);
      if (!queuedTrack) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      return queuedTrack;
    }),
});
