import { useState, useMemo } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { api } from "utils/api";
import { placeholderImageUrl } from "utils/constants";

export default function Apps() {
  const topApps = api.apps.getTop.useQuery();
  const dockCount = api.docks.getCount.useQuery();

  const [query, setQuery] = useState("");

  const filteredApps = useMemo(() => {
    return topApps.data
      ?.map((app, index) => ({
        ...app,
        position: index + 1,
      }))
      .filter((app) =>
        app.name?.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
  }, [topApps, query]);

  return (
    <>
      <Head>
        <title>Dockhunt | Top apps</title>
        <meta name="description" content="Top apps" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="flex min-h-screen w-screen max-w-[80rem] flex-col items-start px-6 py-24 md:px-20">
        <h1 className="mb-6 text-3xl font-semibold">Top 100 apps</h1>
        <div className="relative mb-8 flex w-full max-w-xs items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps"
            className="w-full rounded-md border border-gray-600/60 bg-gray-900/60 p-2 ring-blue-500/50 hover:bg-gray-800/60 focus:outline-none focus:ring-4"
          />
          {query.length > 0 && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 rounded-full bg-gray-800 p-1 px-2 text-sm text-gray-400 hover:bg-gray-700 hover:text-gray-200"
            >
              Clear
            </button>
          )}
        </div>

        <div className="flex w-full flex-col divide-y divide-gray-600/60">
          {filteredApps?.map((app) => (
            <Link
              key={app.name}
              className="flex items-center gap-4 hover:bg-gray-600/60 sm:p-2"
              href={`/apps/${app.name}`}
            >
              <Image
                src={app.iconUrl ?? placeholderImageUrl}
                width={50}
                height={50}
                alt={`${app.name} app icon`}
              />
              <h2>
                {app.position}. {app.name}
              </h2>
              <div className="flex-grow" />
              <p>{app._count.dockItems} docks</p>
              {dockCount.data && (
                <p>
                  {Math.round((app._count.dockItems / dockCount.data) * 100)}%
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
