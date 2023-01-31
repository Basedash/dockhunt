import type { GetServerSidePropsContext } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";

import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { DockCard } from "components/DockCard";
import { AddDockCard } from "components/AddDockCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { BouncingLoader } from "components/BouncingLoader";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const user = api.users.getOne.useQuery({ id: sessionData?.user?.id ?? "" });
  const featuredDocks = api.docks.getFeatured.useQuery();
  const latestDocks = api.docks.getLatest.useQuery();

  return (
    <>
      <Head>
        <title>Dockhunt</title>
        <meta name={"og:title"} content={"Dockhunt"} key={"opengraph-title"} />
        <meta
          name={"twitter:title"}
          content={"Dockhunt"}
          key={"twitter-title"}
        />
        <meta
          name="description"
          content="Discover the apps everyone is docking about"
        />
      </Head>
      <div className="w-screen max-w-[80rem] px-6 py-24 md:py-32 md:px-20">
        {!user.data?.dock && (
          <div className="mb-16 flex flex-col items-center gap-4">
            <h1 className="text-center text-4xl font-bold">
              Discover the apps everyone is docking about
            </h1>
            <h2 className="text-center text-xl">
              Share your dock and see who else has docked the apps you use
            </h2>
            <Link
              href="/add-dock"
              className="rounded-full bg-blue-700 px-4 py-2 hover:bg-blue-600"
            >
              Add your dock
            </Link>
          </div>
        )}

        {!featuredDocks.data || !latestDocks.data ? (
          <div className={'h-full w-full flex justify-center items-center mt-40'}>
          <BouncingLoader />
          </div>
        ) : (
          <>
            <h3 className="mb-8 text-3xl font-semibold">Featured docks</h3>
            <div className="flex flex-col gap-10 md:gap-16">
              {featuredDocks.data.map((dock) => (
                <DockCard key={dock.id} dock={dock} />
              ))}
            </div>

            <h3 className="mt-24 mb-8 text-3xl font-semibold">Latest docks</h3>
            <div className="flex flex-col gap-10 md:gap-16">
              <AddDockCard />
              {latestDocks.data.map((dock) => (
                <DockCard key={dock.id} dock={dock} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  // Hack to convert undefined values to null for user.image
  // TODO: Fix why user.image is undefined. Probably need to map it to "avatarUrl" in DB
  if (session && session.user) {
    session.user.image = session.user.image ?? null;
  }
  return {
    props: {
      session,
    },
  };
}
