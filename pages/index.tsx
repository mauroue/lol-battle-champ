import { trpc } from '../utils/trpc';
import React from 'react';
import { inferQueryResponse } from './api/trpc/[trpc]';

import Image from 'next/image';
import Link from 'next/link';
import { usePlausible } from 'next-plausible';

export default function Home() {
  const {
    data: championPair,
    refetch,
    isLoading
  } = trpc.useQuery(['get-champ-pair'], {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false
  });

  const voteMutation = trpc.useMutation(['cast-vote']);
  const plausible = usePlausible();

  const voteWinner = (selected: number) => {
    if (!championPair) return;

    if (selected === championPair.firstChampion.id) {
      voteMutation.mutate({
        votedFor: championPair.firstChampion.id,
        votedAgainst: championPair.secondChampion.id
      });
    } else {
      voteMutation.mutate({
        votedFor: championPair.secondChampion.id,
        votedAgainst: championPair.firstChampion.id
      });
    }
    plausible('cast-vote');
    refetch();
  };

  const fetchingNext = voteMutation.isLoading || isLoading;

  return (
    <>
      <h1 className="h-screen w-screen flex flex-col items-center justify-center">
        <div className="text-2xl text-center">Who wins?</div>
        <div className="p-6"></div>
        {championPair && (
          <div className="p-6 flex justify-between items-center max-w-2xl">
            <ChampionCard
              champion={championPair.firstChampion}
              vote={() => voteWinner(championPair.firstChampion.id)}
              disabled={fetchingNext}
            />
            <div className="p-8">{'vs'}</div>
            <ChampionCard
              champion={championPair?.secondChampion}
              vote={() => voteWinner(championPair.secondChampion.id)}
              disabled={fetchingNext}
            />
          </div>
        )}
        {!championPair && <img src="loading.svg" className="w-48"></img>}
      </h1>
      <div className="absolute text-center bottom-0 pb-2 w-full">
        <Link
          className="p-4"
          href="https://github.com/mauroue/lol-battle-champ"
        >
          GitHub
        </Link>
        <span className="px-4">{'-'}</span>
        <Link href="/results">Results</Link>
      </div>
    </>
  );
}

type ChampionFromServer = inferQueryResponse<'get-champ-pair'>['firstChampion'];

const ChampionCard: React.FC<{
  champion: ChampionFromServer;
  vote: () => void;
  disabled: boolean;
}> = (props) => {
  return (
    <div
      className={`flex flex-col items-center transition-opacity ${
        props.disabled && 'opacity-0'
      }`}
      key={props.champion.id}
    >
      <h1>{props.disabled}</h1>
      <p className="py-4">{props.champion.name}</p>
      <Image
        width={308}
        height={560}
        onClick={() => props.vote()}
        src={props.champion.imgUrl}
        className="animate-fade-in"
      />
    </div>
  );
};
