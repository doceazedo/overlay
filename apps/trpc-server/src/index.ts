import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { router } from "./trpc";
import { spotifyAppRouter } from "./routers/spotify-app";
import { spotifyWebApiRouter } from "./routers/spotify-web-api";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

const appRouter = router({
  spotifyApp: spotifyAppRouter,
  spotifyWebApi: spotifyWebApiRouter,
});

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(parseInt(process.env.TRPC_SERVER_PORT || "2427"));

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
