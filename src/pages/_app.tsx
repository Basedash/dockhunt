import Head from "next/head";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

import { api } from "../utils/api";

import "../styles/globals.css";
import { MenuBar } from "components/MenuBar";
import { env } from "env/client.mjs";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Script
        src={"https://cdn.usefathom.com/script.js"}
        data-site="ZBAJAOGI"
      />
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name={"og:image"}
          content={`/opengraph.png`}
          key={"opengraph-image"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content={`/opengraph.png`}
          key={"twitter-image"}
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-neutral-900 text-white">
        <MenuBar />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
