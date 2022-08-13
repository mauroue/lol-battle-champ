import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { getVoteOptions } from "../utils/getRandomChamp";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [left, right] = getVoteOptions();
  return (
    <>
      <h1 className='h-screen w-screen flex flex-col items-center justify-center'>
        <div className='text-2xl text-center'>Who wins?</div>
        <div className='p-6'></div>
        <div className='border rounded p-6 flex justify-between items-center max-w-2xl'>
          <div className='bg-red-900 w-32 h-32'>{left}</div>
          <div className='p-8'>vs</div>
          <div className='bg-red-900 w-32 h-32'>{right}</div>
        </div>
      </h1>
    </>
  );
};

export default Home;
