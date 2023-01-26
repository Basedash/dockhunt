import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function AppPage() {
  const router = useRouter();
  const appName = router.query.appName as string | null;

  if (!appName) return null;

  const app = api.apps.getOne.useQuery({ name: appName });

  return (
    <div>
      {app.data ? (
        <>
          <p>{app.data.name}</p>
          <p>{app.data.description}</p>
          {app.data.iconUrl && (
            // TODO: Switch to next/image once we're storing icons in our own bucket
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={app.data.iconUrl}
              alt={`${app.data.name} app icon`}
              width="100"
              height="100"
            />
          )}
          <p>{app.data.websiteUrl}</p>
          <p>{app.data.twitterUrl}</p>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
