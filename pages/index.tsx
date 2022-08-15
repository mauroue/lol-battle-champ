import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import {
  getChampionName,
  getChampionNameCapital,
} from "twisted/dist/constants";
import { getRandomChampByName, getVoteOptions } from "../utils/getRandomChamp";
import { trpc } from "../utils/trpc";

const url = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/";

const Home: NextPage = () => {
  const [hasMounted, setHasMounted] = React.useState(false);
  const [left, right] = React.useMemo(() => getVoteOptions(), []);
  const firstChamp = trpc.useQuery(["get-champ-by-id", { id: left }]);
  const secondChamp = trpc.useQuery(["get-champ-by-id", { id: right }]);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  if (firstChamp.isLoading && secondChamp.isLoading) return null;

  return (
    <>
      <h1 className='h-screen w-screen flex flex-col items-center justify-center'>
        <div className='text-2xl text-center'>Who wins?</div>
        <div className='p-6'></div>
        <div className='border rounded p-6 flex justify-between items-center max-w-2xl'>
          <div className='text-center'>
            <p>{firstChamp.data?.name}</p>
            <img src={url + firstChamp.data?.id + "_0.jpg"} alt='' />
          </div>
          <div className='p-8'>vs</div>
          <div className='text-center'>
            {secondChamp.data?.name}
            <img src={url + secondChamp.data?.id + "_0.jpg"} alt='' />
          </div>
        </div>
      </h1>
    </>
  );
};

export default Home;
