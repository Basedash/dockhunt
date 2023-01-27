import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { api } from "../../utils/api";

export default function UserPage() {
  const router = useRouter();
  const username = router.query.username as string | null;

  if (!username) return null;

  const user = api.users.getOne.useQuery({ username: username });

  return (
    <div>
      {user.data ? (
        <>
          <p>{user.data.name}</p>
          <Link href={`https://twitter.com/${user.data.username}`}>
            {user.data.username}
          </Link>
          {user.data.avatarUrl && (
            <Image
              src={user.data.avatarUrl}
              alt={`${user.data.name} avatar`}
              width="100"
              height="100"
            />
          )}
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
