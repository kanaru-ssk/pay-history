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
