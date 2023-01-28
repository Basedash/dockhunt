import type { GetServerSidePropsContext } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";

import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { DockCard } from "components/DockCard";

const Home: NextPage = () => {
  const featuredDocks = api.docks.getFeatured.useQuery();
  const latestDocks = api.docks.getLatest.useQuery();

  return (
    <>
      <Head>
        <title>Dockhunt</title>
        <meta
          name="description"
          content="Discover the apps everyone is docking about"
        />
      </Head>
      <div className={'px-12 py-24 md:px-20 w-screen max-w-[80rem]'}>
        <h2 className={'text-3xl mb-12'}>Featured</h2>
        <div className="flex flex-col gap-20 overflow-hidden">
          {featuredDocks.data
            ? featuredDocks.data.map((dock) => (
                <DockCard key={dock.id} dock={dock} />
              ))
            : "Loading..."}
        </div>
        <h2 className={'text-3xl mt-24 mb-12'}>Latest</h2>
        <div className="flex flex-col gap-20 overflow-hidden">
          {latestDocks.data
            ? latestDocks.data.map((dock) => (
                <DockCard key={dock.id} dock={dock} />
              ))
            : "Loading..."}
        </div>
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
