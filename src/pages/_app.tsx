import Head from "next/head";

import "styles/globals.css";
import type { AppProps } from "next/app";

import Header from "components/Header";
import Tab from "components/Tab";
import { AuthProvider } from "hooks/auth";
import { initFirebase } from "libs/initFirebase";

function MyApp({ Component, pageProps }: AppProps) {
  initFirebase();

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#232C93" />

        <meta property="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_URL + "/img/ogp.png"}
        />
        <meta property="og:title" content="pay history" />
        <meta
          property="og:description"
          content="カードの予算管理を簡単にしましょう! カード明細は反映に時間がかかってしまい、今いくら使ったのか把握するのは難しいですよね。pay historyを使えば月の予算とその月に使った金額を簡単に管理できます。"
        />
        <meta name="twitter:card" content="summary_large_image" />

        <title>pay history</title>
        <meta
          name="description"
          content="カードの予算管理を簡単にしましょう! カード明細は反映に時間がかかってしまい、今いくら使ったのか把握するのは難しいですよね。pay historyを使えば月の予算とその月に使った金額を簡単に管理できます。"
        />
      </Head>

      <Header />
      <Tab />

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default MyApp;
