import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type {
  AppRouter,
  RouterInput,
  RouterOutput,
} from "../../../apps/server/src";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:2427",
    }),
  ],
});

export type { RouterInput, RouterOutput };
