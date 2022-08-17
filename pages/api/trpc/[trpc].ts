import { appRouter, AppRouter } from '../../../backend/router';

import * as trpcNext from '@trpc/server/adapters/next';
import { inferProcedureOutput } from '@trpc/server';

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null
});

export type inferQueryResponse<
  TrouteKey extends keyof AppRouter['_def']['queries']
> = inferProcedureOutput<AppRouter['_def']['queries'][TrouteKey]>;
