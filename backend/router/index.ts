import data from "../../utils/data.json";
import * as trpc from "@trpc/server";
import { z } from "zod";

export const appRouter = trpc.router().query("get-champ-by-id", {
  input: z.object({
    id: z.number(),
  }),
  async resolve({ input }) {
    const championData = data.find((champion) => champion.id === input.id);

    return championData;
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
