import type { NextPage } from 'next';
import { inferQueryResponse } from './api/trpc/[trpc]';
import React from 'react';
import { getVoteOptions } from '../utils/getRandomChamp';
import { trpc } from '../utils/trpc';

import Image from 'next/image';

const url = 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/';

const Home: NextPage = () => {
  const [hasMounted, setHasMounted] = React.useState(false);
  const [ids, setIds] = React.useState(() => getVoteOptions());

  const [first, second] = ids;

  const firstChamp = trpc.useQuery(['get-champ-by-id', { id: first }]);
  const secondChamp = trpc.useQuery(['get-champ-by-id', { id: second }]);

  const voteMutation = trpc.useMutation(['cast-vote']);

  const voteChamp = (selected?: number) => {
    if (!selected) return;
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second });
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first });
    }
    setIds(getVoteOptions());
  };

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      <h1 className="h-screen w-screen flex flex-col items-center justify-center">
        <div className="text-2xl text-center">Who wins?</div>
        <div className="p-6"></div>
        <div className="border rounded p-6 flex justify-between items-center max-w-2xl">
          <ChampionCard
            champion={firstChamp.data}
            vote={() => voteChamp(first)}
          />
          <div className="p-8">vs</div>
          <ChampionCard
            champion={secondChamp.data}
            vote={() => voteChamp(second)}
          />
        </div>
      </h1>
      <div className="absolute text-center bottom-0 pb-2 w-full">
        <a href="https://github.com/mauroue/lol-champ-battle">GitHub</a>
      </div>
    </>
  );
};

type ChampionFromServer = inferQueryResponse<'get-champ-by-id'>;

const ChampionCard: React.FC<{
  champion: ChampionFromServer;
  vote: () => void;
}> = (props) => {
  return (
    <div className="text-center">
      <p>{props.champion?.name}</p>
      <Image
        width={308}
        height={560}
        onClick={() => props.vote()}
        src={url + props.champion?.alias + '_0.jpg'}
        alt=""
      />
    </div>
  );
};

export default Home;
