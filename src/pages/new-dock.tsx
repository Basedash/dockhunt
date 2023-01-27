import type { App } from "@prisma/client";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { Dock } from "../components/Dock";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import type { GetServerSidePropsContext } from "next";

const NewDock = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const queryParams = router.query;
  const appNames = Array.isArray(queryParams.app)
    ? queryParams.app
    : [queryParams.app ?? ""];
  const apps = api.apps.getManyFromNames.useQuery({ names: appNames });

  const orderedApps = apps.data
    ? appNames
        .map((appName) => apps.data.find((app) => app.name === appName))
        .filter((app): app is App => app !== undefined)
    : [];

  useEffect(() => {
    const handleSigninIfNotSignedIn = async () => {
      if (!session) {
        await signIn("twitter");
      }
    };
    void handleSigninIfNotSignedIn();
  }, [session]);

  return (
    <>
      <Head>
        <title>New dock | Dockhunt</title>
        <meta name="description" content="Save your dock" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {session && (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className={"mb-4 text-xl"}>New dock page</h1>
          <Dock apps={orderedApps} />
        </div>
      )}
    </>
  );
};

export default NewDock;

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
