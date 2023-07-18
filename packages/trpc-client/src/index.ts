import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type {
  AppRouter,
  RouterInput,
  RouterOutput,
} from "../../../apps/trpc-server/src";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:${process.env.TRPC_SERVER_PORT}`,
    }),
  ],
});

export type { RouterInput, RouterOutput };
