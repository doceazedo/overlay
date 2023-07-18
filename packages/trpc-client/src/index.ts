import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type {
  AppRouter,
  RouterInput,
  RouterOutput,
} from "../../../apps/trpc-server/src";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:42070`,
    }),
  ],
});

export type { RouterInput, RouterOutput };
