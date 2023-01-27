import { App } from "@prisma/client";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import { Dock } from "../components/Dock";
import Head from "next/head";

const NewDock = () => {
  const router = useRouter();
  const queryParams = router.query;
  const appNames = Array.isArray(queryParams.app)
    ? queryParams.app
    : [queryParams.app ?? ""];
  const apps = api.apps.getManyFromNames.useQuery({names: appNames});

  const orderedApps = apps.data ? appNames.map((appName) => apps.data.find((app) => app.name === appName)).filter((app): app is App => app !== undefined) : [];

  return (
    <>
      <Head>
        <title>New dock | Dockhunt</title>
        <meta name="description" content="Save your dock" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className={'flex min-h-screen flex-col items-center justify-center bg-black text-white'}>
        <h1 className={"mb-4 text-xl"}>New dock page</h1>
        <Dock apps={orderedApps} />
      </main>
    </>
  );
};

export default NewDock;
