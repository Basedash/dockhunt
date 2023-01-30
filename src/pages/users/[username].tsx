import { Dock } from "components/Dock";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function UserPage() {
  const router = useRouter();
  const username = router.query.username as string | null;

  if (!username) return null;

  const user = api.users.getOne.useQuery({ username: username });

  if (!user.data) {
    return (
      <>
        <Head>
          <title>Dockhunt | {username}</title>
        </Head>
      </>
    );
  }

  const appIconUrls = user.data.dock?.dockItems
    .map((dockItem) => dockItem.app.iconUrl)
    .filter((url): url is string => url !== null);

  const title = user.data ? `Dockhunt | ${user.data.username}` : "Dockhunt";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name={"og:image"}
          content={`/api/og?username=${username}&avatar=${
            user.data?.avatarUrl
          }&${appIconUrls?.map((url) => `icon=${url}`).join("&")}`}
          key={"opengraph-image"}
        />
        <meta name={"twitter:title"} content={title} key={"twitter-title"} />
        <meta
          name="twitter:image"
          content={`/api/og?username=${username}`}
          key={"twitter-image"}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="flex h-screen w-screen flex-col items-center justify-center bg-monterey bg-cover">
        <div className="flex flex-col items-center pb-20">
          {user.data.avatarUrl && (
            <Image
              src={user.data.avatarUrl}
              alt={`${user.data.name} avatar`}
              className="rounded-full"
              width="150"
              height="150"
            />
          )}
          <h1 className="mt-2 text-2xl">{user.data.name}</h1>
          <p className="mt-3 max-w-2xl whitespace-pre-wrap text-center leading-none text-gray-300">
            {user.data.description}
          </p>
          <div className="mt-4 flex gap-4">
            {user.data.url && (
              <a
                className="text-blue-400 hover:underline"
                href={user.data.url}
                target="_blank"
                rel="noreferrer"
              >
                {user.data.url.split("//").at(-1)?.split("/").at(0)}
              </a>
            )}
            <a
              className="text-blue-400 hover:underline"
              href={`https://twitter.com/${username}`}
              target="_blank"
              rel="noreferrer"
            >
              @{username}
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 max-w-full px-4">
          {user.data.dock && (
            <Dock
              apps={user.data.dock.dockItems.map((dockItem) => dockItem.app)}
            />
          )}
        </div>
      </div>
    </>
  );
}
