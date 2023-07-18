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

server.listen(parseInt(`${process.env.TRPC_SERVER_PORT}`));

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
