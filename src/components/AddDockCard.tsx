import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "utils/api";

export function AddDockCard() {
  const { data: sessionData } = useSession();
  const user = api.users.getOne.useQuery({ id: sessionData?.user?.id ?? "" });

  if (user.data?.dock) {
    return null;
  }

  return (
    <div className="relative">
      <div className="h-64 w-full rounded-[36px] border border-solid border-gray-600/60 bg-monterey bg-cover bg-center opacity-60" />
      <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center p-8 text-xl">
        <p>Want to add your own dock? Just run:</p>
        <code className="my-4 rounded border border-gray-100/60 bg-gray-900/70 p-4 backdrop-blur">
          npx dockhunt
        </code>
        <Link href="/add-dock" className="text-blue-400 hover:underline">
          More details &rarr;
        </Link>
      </div>
    </div>
  );
}
