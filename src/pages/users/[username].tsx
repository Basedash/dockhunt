import { Dock } from "components/Dock";
import { env } from "env/client.mjs";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { api } from "../../utils/api";
import { useSession } from "next-auth/react";

export default function UserPage() {
  const router = useRouter();
  const username = router.query.username as string | null;
  const { data: sessionData } = useSession();

  if (!username) return null;

  const user = api.users.getOne.useQuery({ username: username });

  if (!user.data) {
    return null;
  }

  const appIconUrls = user.data.dock?.dockItems
    .map((dockItem) => dockItem.app.iconUrl)
    .filter((url): url is string => url !== null);

  const title = user.data ? `Dockhunt | ${user.data.username}` : "Dockhunt";
  const ogImageLink = `${
    env.NEXT_PUBLIC_URL
  }/api/og?username=${username}&avatar=${encodeURIComponent(
    user.data?.avatarUrl ?? ""
  )}&${appIconUrls
    ?.map((url) => `icon=${encodeURIComponent(url)}`)
    .join("&")}&v1.0.0`;

  const description = `${user.data.name}'s dock on Dockhunt`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name={"og:image"} content={ogImageLink} key={"opengraph-image"} />
        <meta name={"og:image:height"} content={"630"} />
        <meta name={"og:image:width"} content={"1200"} />
        <meta name={"twitter:title"} content={title} key={"twitter-title"} />
        <meta
          name={"twitter:description"}
          content={description}
          key={"twitter-description"}
        />
        <meta
          name="twitter:image"
          content={ogImageLink}
          key={"twitter-image"}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-monterey bg-cover">
        {/* Only show the share button for the dock of the currently logged-in user */}
        {sessionData?.user?.username === username && (
          <a
            className={
              "absolute top-[65px] right-[15px] rounded-full bg-[#4999E9] px-4 py-2 hover:bg-[#428AD2] md:top-[45px]"
            }
            href={`https://twitter.com/intent/tweet?text=Check%20out%20my%20dock%20on%20%40dockhuntapp%3A%0A%0A${encodeURIComponent(
              env.NEXT_PUBLIC_URL
            )}${encodeURIComponent(router.asPath)}`}
            target={"_blank"}
            rel="noreferrer"
          >
            Share on Twitter
          </a>
        )}
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
          <p className="mt-3 max-w-2xl whitespace-pre-wrap text-center leading-normal text-gray-300">
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
