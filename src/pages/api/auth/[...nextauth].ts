import NextAuth, { type NextAuthOptions } from "next-auth";
import type { TwitterProfile } from "next-auth/providers/twitter";
import TwitterProvider from "next-auth/providers/twitter";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
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
      userinfo: {
        url: "https://api.twitter.com/2/users/me",
        params: { "user.fields": "profile_image_url,public_metrics" },
      },
      profile(profile: {data: TwitterProfile['data'] & {profile_image_url: string; public_metrics: {followers_count: number}}}) {
        return {
          id: profile.data.id,
          name: profile.data.name,
          twitterFollowerCount: profile.data.public_metrics.followers_count,
          twitterHandle: profile.data.username,
          avatarUrl: profile.data.profile_image_url.replace(
            /_normal\.(jpg|png|gif)$/,
            ".$1"
          ),
        };
      }
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
