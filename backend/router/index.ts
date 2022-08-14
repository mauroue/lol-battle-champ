import { LolApi, Constants } from "twisted";

import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

export const appRouter = trpc.router().query("get-champ-by-id", {
  input: z.object({
    id: z.number(),
  }),
  async resolve({ input }) {
    const api = new LolApi({ key: process.env.LOL_API_KEY });

    const champion = await api.DataDragon.getChampion(input.id);
    return champion;
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
