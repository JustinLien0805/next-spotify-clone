import type { NextPage } from "next";
import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div>{/* {player} */}</div>
    </div>
  );
};

export default Home;
