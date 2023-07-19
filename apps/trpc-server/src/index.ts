import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { router } from "./trpc";
import { spotifyApiRouter } from "./routers/spotify-api";
import { spotifyAppRouter } from "./routers/spotify-app";
import { twitchRouter } from "./routers/twitch";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

const appRouter = router({
  spotifyApi: spotifyApiRouter,
  spotifyApp: spotifyAppRouter,
  twitch: twitchRouter,
});

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(parseInt(`${process.env.TRPC_SERVER_PORT}`));

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
