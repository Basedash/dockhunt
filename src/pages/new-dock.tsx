import { App } from "@prisma/client";
import { useRouter } from "next/router";
import { api } from "../utils/api";

const NewDock = () => {
  const router = useRouter();
  const queryParams = router.query;
  const appNames = Array.isArray(queryParams.app)
    ? queryParams.app
    : [queryParams.app ?? ""];
  const apps = api.apps.getManyFromNames.useQuery({names: appNames});

  const orderedApps = apps.data ? appNames.map((appName) => apps.data.find((app) => app.name === appName)).filter((app): app is App => app !== undefined) : [];

  return (
    <div>
      <h1 className={"mb-4 text-xl"}>New dock page</h1>
      <div className={"flex flex-col gap-y-2"}>
        {orderedApps.map((app) => (
          <div key={app.name}><span>{app.name}</span><img src={app.iconUrl ?? 'https://pbs.twimg.com/profile_images/1608922988568580098/R9cL7iMb_400x400.jpg'} /></div>
        ))}
      </div>
    </div>
  );
};

export default NewDock;
