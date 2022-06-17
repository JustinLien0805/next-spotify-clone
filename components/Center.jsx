import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
import { useRecoilValue, useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import Songs from "./Songs";
import useSpotify from "../hooks/useSpotify";
const colors = [
  "from-red-500",
  "from-emerald-500",
  "from-indigo-500",
  "from-violet-500",
  "from-orange-500",
  "from-teal-500",
  "from-cyan-500",
  "from-pink-500",
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();
  const [color, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const [isActive, setActive] = useState("false");

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => {
        console.log("Something went wrong!", err);
      });
  }, [spotifyApi, playlistId]);

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll">
      <header className="absolute top-5 right-8" onClick={handleToggle}>
        <div
          className="flex items-center  bg-black space-x-3 opacity-90
         hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <div
        className={
          `h-10 w-52 rounded-sm bg-[#2e2e2e] text-white absolute right-8 top-[4.3rem] flex-col` +
          " " +
          `${isActive ? "hidden" : "flex"}`
        }
      >
        <div
          className="flex items-center justify-between cursor-pointer px-3 py-2"
          onClick={signOut}
        >
          <p className="hover:bg-[#2b2d30]">Log out</p>
          <LogoutIcon className="w-5 h-5" />
        </div>
      </div>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b
       to-black ${color} h-80 text-white p-8`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt=""
          className="h-44 w-44 shadow-2xl"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>
      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
