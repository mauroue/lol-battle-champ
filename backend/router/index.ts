import * as trpc from '@trpc/server';
import { z } from 'zod';
import { getVoteOptions } from '../../utils/getRandomChamp';
import { prisma } from '../utils/prisma';

export const appRouter = trpc
  .router()
  .query('get-champ-pair', {
    async resolve() {
      const [first, second] = getVoteOptions();

      const bothChampions = await prisma.champion.findMany({
        where: { id: { in: [first, second] } }
      });

      if (bothChampions.length !== 2)
        throw new Error('Failed to fetch two champions.');

      return {
        firstChampion: bothChampions[0],
        secondChampion: bothChampions[1]
      };
    }
  })
  .mutation('cast-vote', {
    input: z.object({
      votedFor: z.number(),
      votedAgainst: z.number()
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          votedAgainstId: input.votedAgainst,
          votedForId: input.votedFor
        }
      });
      return { sucess: true, vote: voteInDb };
    }
  });

// export type definition of API
export type AppRouter = typeof appRouter;
