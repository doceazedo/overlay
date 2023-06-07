import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import cors from "cors";
import { router } from "./trpc";
import { spotifyRouter } from "./routers/spotify";

const appRouter = router({
  spotify: spotifyRouter,
});

const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});

server.listen(2427);

export type AppRouter = typeof appRouter;
export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
