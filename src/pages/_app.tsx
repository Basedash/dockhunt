import Head from "next/head";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import * as Tooltip from "@radix-ui/react-tooltip";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

import { api } from "../utils/api";

import "../styles/globals.css";
import { MenuBar } from "components/MenuBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Tooltip.Provider delayDuration={0}>
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
          <meta
            name="twitter:description"
            content={`Discover the apps everyone is docking about`}
            key={"twitter-description"}
          />
          <meta
            name="twitter:site"
            content={'dockhuntapp'}
          />
        </Head>
        <main className="flex min-h-screen flex-col items-center bg-neutral-900 text-white">
          <MenuBar />
          <Component {...pageProps} />
        </main>
      </Tooltip.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
