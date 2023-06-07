import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { router } from "./trpc";
import { spotifyAppRouter } from "./routers/spotify-app";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

const appRouter = router({
  spotifyApp: spotifyAppRouter,
});

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(2427);

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
