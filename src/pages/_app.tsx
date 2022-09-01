import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";

import "styles/globals.css";

import Header from "components/Header";
import Tab from "components/Tab";

const DynamicAuthProvider = dynamic(() => import("hooks/auth"), {
  ssr: false,
});

const DynamicTabStatusProvider = dynamic(() => import("hooks/tabStatus"), {
  ssr: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pay History</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <DynamicAuthProvider>
        <DynamicTabStatusProvider>
          <Header />
          <Tab />

          <Component {...pageProps} />
        </DynamicTabStatusProvider>
      </DynamicAuthProvider>
    </>
  );
}

export default MyApp;
