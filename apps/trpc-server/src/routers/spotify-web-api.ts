import z from "zod";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import { getTrack, queueTrack, searchTracks } from "../clients/spotify";

const getTrackByQuery = async (query: string) => {
  const tracks = await searchTracks(query, 1);
  if (!tracks?.length) return null;
  return tracks[0];
};

export const spotifyWebApiRouter = router({
  findFirstTrack: publicProcedure
    .input(z.object({ query: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      const possiblyAnID =
        input.query.split("track:")?.[1] || // uri
        input.query.split("track/")?.[1]?.split("?")?.[0] || // url
        input.query; // id
      const track =
        (await getTrack(possiblyAnID)) || (await getTrackByQuery(input.query));
      return track;
    }),
  queueTrack: publicProcedure
    .input(z.object({ uri: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      const track = await queueTrack(input.uri);
      if (!track) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      return track;
    }),
});
