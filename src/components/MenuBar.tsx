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
import { api } from "../utils/api";

export const MenuBar = () => {
  const { data: sessionData } = useSession();
  const user = api.users.getOne.useQuery({ id: sessionData?.user?.id ?? "" });

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 5000); // Update every 5 seconds so we don't get too out of sync

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed z-20 flex w-full flex-col items-center justify-between bg-gray-800/30 px-4 py-1 text-sm backdrop-blur-3xl md:flex-row">
      <div className="flex items-center gap-4">
        <Link className="flex gap-4 font-bold" href="/">
          <Image src={dockhunt} alt="Dockhunt" height="16" />
          Dockhunt
        </Link>
        <Link className="hidden md:block" href="/add-dock">
          {user.data?.dock ? "Update your dock" : "Add your dock"}
        </Link>
        <a href="https://www.basedash.com" target="_blank" rel="noreferrer">
          Made by Basedash
        </a>
        <button
          onClick={
            sessionData
              ? () => void signOut({ redirect: false })
              : () => void signIn("twitter")
          }
        >
          {sessionData ? "Log out" : "Log in"}
        </button>
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
          href="https://github.com/Basedash/dockhunt-cli"
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
        <div className="hidden tabular-nums md:block">
          {format(date, "eee MMM d p")}
        </div>
        {sessionData && sessionData.user && (
          <Link href={`/users/${sessionData.user.username}`}>
            {sessionData.user.name}
          </Link>
        )}
      </div>
    </div>
  );
};
