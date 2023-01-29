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
        <meta name={"og:title"} content={"Dockhunt"} key={"opengraph-title"} />
        <meta name={"twitter:title"} content={"Dockhunt"} key={"twitter-title"} />
        <meta
          name="description"
          content="Discover the apps everyone is docking about"
        />
      </Head>
      <div
        className={
          "w-screen max-w-[80rem] overflow-hidden px-12 py-24 md:px-20"
        }
      >
        <h2 className={"mb-12 text-3xl"}>Featured</h2>
        <div className="flex flex-col gap-20">
          {featuredDocks.data
            ? featuredDocks.data.map((dock) => (
                <DockCard key={dock.id} dock={dock} />
              ))
            : "Loading..."}
        </div>
        <h2 className={"mt-24 mb-12 text-3xl"}>Latest</h2>
        <div className="flex flex-col gap-20">
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
