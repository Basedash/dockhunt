import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { api } from "utils/api";
import { placeholderImageUrl } from "utils/constants";

export default function Apps() {
  const topApps = api.apps.getTop.useQuery();
  const dockCount = api.docks.getCount.useQuery();

  return (
    <>
      <Head>
        <title>Dockhunt | Top apps</title>
        <meta name="description" content="Top apps" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="flex min-h-screen w-screen max-w-[80rem] flex-col items-start justify-center px-6 py-24 md:px-20">
        <h1 className="mb-8 text-3xl font-semibold">Top 100 apps</h1>
        <div className="flex w-full flex-col divide-y divide-gray-600/60">
          {topApps.data?.map((app, index) => (
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
                {index + 1}. {app.name}
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
