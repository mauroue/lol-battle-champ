import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["hello", { text: "client" }]);
  if (!hello.data) {
    return <div>Loading...</div>;
  } else return <div>{hello.data.greeting}</div>;
  return (
    <>
      <h1 className='h-screen w-screen flex flex-col items-center justify-center'>
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
