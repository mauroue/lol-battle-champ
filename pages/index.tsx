import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <h1 className='h-screen w-screen flex flex-col justify-center'>
        <div className='text-2xl text-center'>Who wins?</div>
        <div className='p-6'></div>
        <div className='border rounded p-6 flex justify-between items-center max-w-2xl'>
          <div className='bg-red-400 w-32 h-32'></div>
          <div className='p-8'>vs</div>
          <div className='bg-red-200 w-32 h-32'></div>
        </div>
      </h1>
    </>
  );
};

export default Home;
