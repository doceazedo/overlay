import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { CONFIG } from "config";
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

server.listen(CONFIG.trpcServerPort || 2427);

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
