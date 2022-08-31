import type { AppProps } from "next/app";
import Head from "next/head";

import "styles/globals.css";

import Header from "components/Header";
import Tab from "components/Tab";
import { AuthProvider } from "hooks/auth";
import { TabStatusProvider } from "hooks/tabStatus";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Pay History</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
