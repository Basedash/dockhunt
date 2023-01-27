import type { GetServerSidePropsContext } from "next";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "../utils/api";
import format from "date-fns/format";
import { Dock } from "../components/Dock";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage = () => {
  const featuredDocks = api.docks.getFeatured.useQuery();

  return (
    <>
      <Head>
        <title>Dockhunt</title>
        <meta name="description" content="Visualize people's Mac docks" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-col gap-12">
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
                  <div className="flex justify-center gap-12 rounded-xl border border-solid border-gray-700 p-8">
                    <Dock
                      apps={dock.dockItems.map((dockItem) => dockItem.app)}
                    />
                  </div>
                </div>
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
