import { format } from "date-fns";
import basedash from "images/basedash.svg";
import dockhunt from "images/dockhunt.svg";
import github from "images/github.svg";
import npm from "images/npm.svg";
import twitter from "images/twitter.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const MenuBar = () => {
  const { data: sessionData } = useSession();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 5000); // Update every 5 seconds so we don't get too out of sync

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed z-10 flex w-full items-center justify-between bg-gray-800/30 px-4 py-1 text-sm backdrop-blur-3xl">
      <div className="flex items-center gap-4">
        <Link className="flex gap-4 font-bold" href="/">
          <Image src={dockhunt} alt="Dockhunt" height="16" />
          Dockhunt
        </Link>
        <Link href="/new-dock?app=Notion&app=Slack&app=Basedash">
          Add your dock
        </Link>
        <button
          onClick={
            sessionData
              ? () => void signOut({ redirect: false })
              : () => void signIn("twitter")
          }
        >
          {sessionData ? "Log out" : "Log in"}
        </button>
        <a href="https://www.basedash.com" target="_blank" rel="noreferrer">
          Made by Basedash
        </a>
      </div>

      <div className="flex items-center gap-4">
        <a href="https://www.basedash.com" target="_blank" rel="noreferrer">
          <Image src={basedash} alt="Basedash" height="16" />
        </a>
        <a
          href="https://twitter.com/dockhuntapp"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={twitter} alt="Twitter" height="16" />
        </a>
        <a
          href="https://github.com/Basedash/dockhunt"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={github} alt="GitHub" height="20" />
        </a>
        <a
          className="fill-white"
          href="https://www.npmjs.com/package/dockhunt"
          target="_blank"
          rel="noreferrer"
        >
          <Image src={npm} alt="npm" height="20" />
        </a>
        <div className="tabular-nums">{format(date, "eee MMM d p")}</div>
        {sessionData && sessionData.user && (
          <Link href={`/users/${sessionData.user.username}`}>
            {sessionData.user.name}
          </Link>
        )}
      </div>
    </div>
  );
};
