import data from '../../utils/data.json';
import * as trpc from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../utils/prisma';

export const appRouter = trpc
  .router()
  .query('get-champ-by-id', {
    input: z.object({
      id: z.number()
    }),
    async resolve({ input }) {
      const championData = data.find((champion) => champion.id === input.id);
      return championData;
    }
  })
  .mutation('cast-vote', {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number()
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({ data: { ...input } });
      return { sucess: true };
    }
  });

// export type definition of API
export type AppRouter = typeof appRouter;
