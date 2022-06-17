import Head from "next/head";
import Center from "../components/Center";
import Sidebar from "../components/Sidebar";
import Player from "../components/Player";
import { getSession } from "next-auth/react";
const Home = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div  className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log(session);
  return {
    props: {
      session,
    },
  };
}

export default Home;
