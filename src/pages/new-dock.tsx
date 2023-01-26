import { useRouter } from "next/router";

const NewDock = () => {
  const router = useRouter();
  const queryParams = router.query;
  const appNames = Array.isArray(queryParams.app)
    ? queryParams.app
    : [queryParams.app ?? ""];

  return (
    <div>
      <h1 className={"mb-4 text-xl"}>New dock page</h1>
      <div className={"flex flex-col gap-y-2"}>
        {appNames.map((appName) => (
          <div key={appName}>{appName}</div>
        ))}
      </div>
    </div>
  );
};

export default NewDock;
