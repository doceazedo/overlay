import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router } from "./trpc";
import { spotifyRouter } from "./routers/spotify";

const appRouter = router({
  spotify: spotifyRouter,
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(2427);

export type AppRouter = typeof appRouter;
