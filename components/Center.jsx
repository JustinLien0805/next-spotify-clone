import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { shuffle } from "lodash";
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
  const [color, setColor] = useState(null);
  console.log(session);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, []);
  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center  bg-red-300 space-x-3 opacity-90
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

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b
       to-black ${color} h-80 text-white p-8`}
      >
        <h1>hello</h1>
      </section>
    </div>
  );
};

export default Center;
