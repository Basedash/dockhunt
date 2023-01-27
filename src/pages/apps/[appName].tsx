import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function AppPage() {
  const router = useRouter();
  const appName = router.query.appName as string | null;

  if (!appName) return null;

  const app = api.apps.getOne.useQuery({ name: appName });

  const twitterHandle = app.data?.twitterUrl?.split("/").at(-1);

  return (
    <>
      <Head>
        <title>{app.data ? `Dockhunt | ${app.data.name}` : "Dockhunt"}</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-black text-white">
        {app.data ? (
          <>
            {app.data.iconUrl && (
              <Image
                src={app.data.iconUrl}
                alt={`${app.data.name} app icon`}
                className="mt-20"
                width="150"
                height="150"
              />
            )}
            <h1 className="mt-2 text-[40px] font-black">{app.data.name}</h1>
            <p className="mt-3 text-gray-400">{app.data.description}</p>
            <div className="mt-2 flex gap-4">
              {app.data.websiteUrl && (
                <a
                  className="hover:underline"
                  href={app.data.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              )}
              {app.data.twitterUrl && (
                <a
                  className="hover:underline"
                  href={app.data.twitterUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{twitterHandle}
                </a>
              )}
            </div>
          </>
        ) : (
          <span>Loading...</span>
        )}
      </main>
    </>
  );
}
