import React from "react";
import { getProviders, signIn } from "next-auth/react";
const login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <h1 className="text-white m-5 text-[10rem] font-bold">SPOTIFY</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="border-[#18d860] text-white p-5 rounded-full font-bold border-2"
            onClick={() => {
              signIn(provider.id, { callbackUrl: "/" });
            }}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
