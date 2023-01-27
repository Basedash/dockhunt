import { GetServerSidePropsContext, type NextPage } from "next";
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
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

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
        <div className={"relative w-full flex items-start pt-4 px-4 justify-center"}>
          <div className={'absolute left-4 top-4'}>
            <AuthShowcase />
          </div>
          <h1 className="text-5xl font-extrabold sm:text-[5rem] pt-4">
            <Image
              src={imgSrc}
              alt="Dockhunt logo"
              width={120}
              height={120}
              onMouseEnter={cycleImage}
            />
          </h1>
          <div className={'absolute right-4 top-4 flex'}>
            <Link
              href={"/new-dock?app=Notion&app=Slack&app=Basedash"}
              className={"bg-cyan-300 rounded-full px-8 py-2 font-semibold text-black transition hover:bg-cyan-200"}
            >
              Add your dock
            </Link>
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex gap-12">
            {featuredDocks.data
              ? featuredDocks.data.map((dock) => (
                  <div key={dock.id}>
                    <p className="text-sm text-gray-600">
                      {format(dock.createdAt, "MMM d, y")}
                    </p>
                    <Link
                      href={`/users/${dock.user.username}`}
                      className="text-gray-600"
                    >
                      {dock.user.name}
                    </Link>
                    <div className="flex gap-12 rounded-xl border border-solid border-gray-700 p-8">
                      <Dock
                        apps={dock.dockItems.map((dockItem) => dockItem.app)}
                      />
                    </div>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center justify-center gap-2">
      {sessionData && sessionData.user && (
        <Link href={`/users/${sessionData.user.username}`}>
          <Image
            // TODO: Use a default image for placeholder
            src={sessionData.user.image ?? ''}
            alt={`${sessionData.user.name} avatar`}
            className={"rounded-full"}
            width="30"
            height="30"
          />
        </Link>
      )}
      <button
        className="rounded-full bg-white/10 py-1 p-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={
          sessionData ? () => void signOut() : () => void signIn("twitter")
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  )
  // Hack to convert undefined values to null for user.image
  // TODO: Fix why user.image is undefined. Probably need to map it to "avatarUrl" in DB
  if (session && session.user) {
    session.user.image = session.user.image ?? null;
  }
  return {
    props: {
      session,
    },
  }
}
