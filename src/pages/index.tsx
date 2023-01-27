import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";
import format from "date-fns/format";
import { Dock } from "../components/Dock";
import Image from "next/image";
import dockhuntDarkBigSur from "../images/Dockhunt-dark-bigsur.png";
import dockhuntDarkMojave from "../images/Dockhunt-dark-mojave.png";
import dockhuntDarkVentura from "../images/Dockhunt-dark-ventura.png";
import dockhuntLightBigSur from "../images/dockhunt-light-bigsur.png";
import dockhuntLightVentura from "../images/dockhunt-light-ventura.png";
import { useState } from "react";

const images = [
  dockhuntDarkBigSur,
  dockhuntDarkMojave,
  dockhuntDarkVentura,
  dockhuntLightBigSur,
  dockhuntLightVentura,
];

const Home: NextPage = () => {
  const featuredDocks = api.docks.getFeatured.useQuery();
  const [imgSrc, setImgSrc] = useState(dockhuntDarkBigSur);

  const cycleImage = () => {
    const index = images.indexOf(imgSrc);
    const nextIndex = index === images.length - 1 ? 0 : index + 1;
    setImgSrc(images[nextIndex]!);
  };

  return (
    <>
      <Head>
        <title>Dockhunt</title>
        <meta name="description" content="Visualize people's Mac docks" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-black text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold sm:text-[5rem]">
            <Image
              src={imgSrc}
              alt="Dockhunt logo"
              width={120}
              height={120}
              onMouseEnter={cycleImage}
            />
          </h1>
          <div className="flex gap-12">
            {featuredDocks.data
              ? featuredDocks.data.map((dock) => (
                  <div key={dock.id}>
                    <p className="text-gray-600">
                      {format(dock.createdAt, "yyyy mm dd")}
                    </p>
                    <p className="text-gray-600">{dock.user.name}</p>
                    <div className="flex gap-12 rounded-xl border border-solid border-gray-700 p-8">
                      <Dock
                        apps={dock.dockItems.map((dockItem) => dockItem.app)}
                      />
                    </div>
                  </div>
                ))
              : "Loading..."}
          </div>
          <div className="flex flex-col items-center gap-2">
            <AuthShowcase />
          </div>
          <Link
            href={"/new-dock?app=Notion&app=Slack&app=Basedash"}
            className={"bg-orange-400"}
          >
            Create new dock
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={
          sessionData ? () => void signOut() : () => void signIn("twitter")
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
