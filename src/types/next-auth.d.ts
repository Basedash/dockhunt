import { type DefaultSession } from "next-auth";
import { DefaultUser } from "next-auth/core/types";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      username: string; // Twitter handle
      name: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    avatarUrl: string | null;
    username: string;
    name: string;
  }
}
