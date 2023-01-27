import Head from "next/head";
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Script from 'next/script'


import { api } from "../utils/api";

import "../styles/globals.css";
import { TopBar } from "components/TopBar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Script src={'https://cdn.usefathom.com/script.js'} data-site="ZBAJAOGI" />
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta name={'og:image'} content={'/opengraph.png'} key={'opengraph-image'} />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-black text-white">
      <TopBar />
      <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
