import type { GetServerSidePropsContext } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "../utils/api";

import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { DockCard } from "components/DockCard";

const Home: NextPage = () => {
  const featuredDocks = api.docks.getFeatured.useQuery();

  return (
    <>
      <Head>
        <title>Dockhunt</title>
        <meta
          name="description"
          content="Discover the apps everyone is docking about"
        />
      </Head>
      <div className="flex w-screen max-w-[80rem] flex-col gap-20 overflow-hidden px-12 py-24 md:px-20">
        {featuredDocks.data
          ? featuredDocks.data.map((dock) => (
              <DockCard key={dock.id} dock={dock} />
            ))
          : "Loading..."}
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
