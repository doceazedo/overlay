import z from "zod";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { publicProcedure, router } from "./trpc";

const appRouter = router({
  userCreate: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      return { foo: "bar", input };
    }),
});

const server = createHTTPServer({
  router: appRouter,
});

server.listen(2427);

export type AppRouter = typeof appRouter;
