import { DockCard } from "components/DockCard";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function AppPage() {
  const router = useRouter();
  const appName = router.query.appName as string | null;

  if (!appName) return null;

  const app = api.apps.getOne.useQuery({ name: appName });

  if (!app.data) {
    return (
      <>
        <Head>
          <title>Dockhunt | {appName}</title>
        </Head>
      </>
    );
  }

  if (!app.data || !app.data.app) {
    return (
      <>
        <Head>
          <title>Dockhunt | App not found</title>
        </Head>
        <div className="flex h-screen flex-col items-center justify-center">
          <h1 className="text-3xl font-black">App not found</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Dockhunt | {app.data.app.name}</title>
      </Head>
      <div className="w-screen max-w-[80rem] px-6 md:px-20">
        <div className="flex flex-col items-center">
          {app.data.app.iconUrl && (
            <Image
              src={app.data.app.iconUrl}
              alt={`${app.data.app.name} app icon`}
              className="mt-20"
              width="150"
              height="150"
            />
          )}
          <h1 className="mt-2 text-3xl font-semibold">{app.data.app.name}</h1>
          <p className="mt-3 max-w-2xl whitespace-pre-wrap text-center leading-normal text-gray-300">
            {app.data.app.description}
          </p>
          <div className="mt-4 flex gap-4">
            {app.data.app.websiteUrl && (
              <a
                className="text-blue-400 hover:underline"
                href={app.data.app.websiteUrl}
                target="_blank"
                rel="noreferrer"
              >
                {app.data.app.websiteUrl.split("//").at(-1)?.split("/").at(0)}
              </a>
            )}
            {app.data.app.twitterUrl && (
              <a
                className="text-blue-400 hover:underline"
                href={app.data.app.twitterUrl}
                target="_blank"
                rel="noreferrer"
              >
                @{app.data.app.twitterUrl.split("/").at(-1)}
              </a>
            )}
          </div>
        </div>

        <div className="w-full py-24">
          <h3 className="mb-8 text-3xl font-semibold">
            Docked by {app.data.docks.length}{" "}
            {app.data.docks.length === 1 ? "Dockhunter" : "Dockhunters"}
          </h3>
          <div className="flex flex-col gap-10 md:gap-16">
            {app.data.docks.map((dock) => (
              <DockCard key={dock.id} dock={dock} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
