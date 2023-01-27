import Image from "next/image";
import Link from "next/link";
import logo from "images/logo.svg";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export const TopBar = () => {
  const { data: sessionData } = useSession();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 5000); // Update every 5 seconds so we don't get too out of sync

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed z-10 flex w-full items-center justify-between bg-gray-800/30 px-4 py-1 backdrop-blur-3xl">
      <div className="flex items-center gap-4">
        <Link className="flex gap-2 font-medium" href="/">
          <Image src={logo} alt="Dockhunt" height="16" />
          Dockhunt
        </Link>
        <Link href="/new-dock?app=Notion&app=Slack&app=Basedash">Add dock</Link>
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
        <Link href="https://www.basedash.com">Made by Basedash</Link>
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
