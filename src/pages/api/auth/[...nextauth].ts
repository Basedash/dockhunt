import NextAuth, { type NextAuthOptions } from "next-auth";
import TwitterProvider, { TwitterLegacy, TwitterLegacyProfile } from "next-auth/providers/twitter";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";
import { CallbacksOptions } from "next-auth/core/types";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    jwt({token, user, account, profile, isNewUser, ...rest}) {
      console.log('rest', rest);
      console.log('user', token, user, account, profile, isNewUser);
      if (profile) {
          token['userProfile'] = {
              // @ts-ignore
              followersCount: profile.followers_count,
              // @ts-ignore
              twitterHandle: profile.screen_name,
              // @ts-ignore
              userID: profile.id
          };
      }
      if (account) {
          token['credentials'] = {
              authToken: account.oauth_token,
              authSecret: account.oauth_token_secret,
          }
      }
      return token
  },
    session({ session, user }) {
      console.log('user', user);
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: env.TWITTER_CLIENT_ID,
      clientSecret: env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    })
    /**
     * ...add more providers here
     *
     * Most other providers require a bit more work than the Discord provider.
     * For example, the GitHub provider requires you to add the
     * `refresh_token_expires_in` field to the Account model. Refer to the
     * NextAuth.js docs for the provider you want to use. Example:
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

export default NextAuth(authOptions);
