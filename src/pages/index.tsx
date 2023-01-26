import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "../utils/api";
import format from "date-fns/format";

const Home: NextPage = () => {
  const featuredDocks = api.docks.getFeatured.useQuery();

  return (
    <>
      <Head>
        <title>Dockhunt</title>
        <meta name="description" content="Visualize people's Mac docks" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold sm:text-[5rem]">
            Dockhunt ⚓︎
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
                      <div className="flex gap-12 rounded-xl border border-solid border-gray-700 p-8">
                        {dock.dockItems.map((dockItem) => (
                          <Link
                            key={dockItem.id}
                            href={`/apps/${dockItem.app.name}`}
                          >
                            {/* TODO: Switch to next/image once we're storing icons in our own bucket */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={
                                dockItem.app.iconUrl ??
                                "https://www.pngkit.com/png/detail/103-1038731_ios-icon-icons-png-free-and-downloads-ios.png"
                              }
                              alt={`${dockItem.app.name} app icon`}
                              width="100"
                              height="100"
                              title={dockItem.app.name}
                            />
                          </Link>
                        ))}
                      </div>
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
