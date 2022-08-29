import Head from "next/head";

import "styles/globals.css";
import type { AppProps } from "next/app";

import Header from "components/Header";
import Tab from "components/Tab";
import { AuthProvider } from "hooks/auth";
import { TabStatusProvider } from "hooks/tabStatus";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#C1C5FE" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_URL + "/img/ogp.png"}
        />
        <meta property="og:title" content="Pay History" />
        <meta
          property="og:description"
          content="予算管理ツール「Pay History」なら、月の予算、使った金額、予算残高を最もシンプルに管理できます。"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <title>Pay History</title>
        <meta
          name="description"
          content="予算管理ツール「Pay History」なら、月の予算、使った金額、予算残高を最もシンプルに管理できます。"
        />
      </Head>

      <AuthProvider>
        <TabStatusProvider>
          <Header />
          <Tab />

          <Component {...pageProps} />
        </TabStatusProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
