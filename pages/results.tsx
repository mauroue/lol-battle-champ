import { GetServerSideProps } from 'next';
import { prisma } from '../backend/utils/prisma';
import { AsyncReturnType } from '../utils/ts-infer-type';

import Image from 'next/image';
import Head from 'next/head';

const getChampionInOrder = async () => {
  return await prisma.champion.findMany({
    orderBy: {
      VoteFor: { _count: 'desc' }
    },
    select: {
      id: true,
      name: true,
      imgUrl: true,
      _count: { select: { VoteFor: true, VoteAgainst: true } }
    }
  });
};

type ChampionQueryResult = AsyncReturnType<typeof getChampionInOrder>;

const winRate = (champion: ChampionQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = champion._count;
  if (VoteFor + VoteAgainst === 0) return 0;
  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const ChampionListing: React.FC<{
  champion: ChampionQueryResult[number];
  rank: number;
}> = (props) => {
  return (
    <div className="flex justify-center">
      <div className="flex border-b p-3 w-80">
        <div className="p-5 text-xl">{props.rank}</div>
        <Image
          width={77}
          height={140}
          layout="fixed"
          src={props.champion.imgUrl}
        />
        <div className="p-2 text-lg">
          <div className="">{props.champion.name}</div>
          <div>{'Win%: ' + winRate(props.champion).toFixed(2) + '%'}</div>
        </div>
      </div>
    </div>
  );
};

const ResultsPage: React.FC<{
  champion: ChampionQueryResult;
}> = (props) => {
  return (
    <div>
      <Head>
        <title>Strongest LOL Champion Results</title>
      </Head>
      <h1 className="flex flex-col w-full text-3xl py-8 content-center text-center">
        Strongest Champions
      </h1>
      {props.champion
        .sort((a, b) => {
          const difference = winRate(b) - winRate(a);
          if (difference === 0) return b._count.VoteFor - a._count.VoteFor;
          return difference;
        })
        .map((currentChampion, index) => {
          return (
            <ChampionListing
              champion={currentChampion}
              key={index}
              rank={index + 1}
            />
          );
        })}
    </div>
  );
};

export default ResultsPage;

export const getStaticProps: GetServerSideProps = async () => {
  const championsOrdered = await getChampionInOrder();
  return { props: { champion: championsOrdered }, revalidate: 30 };
};
