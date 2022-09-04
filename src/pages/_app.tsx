import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";

import "styles/globals.css";

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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <DynamicAuthProvider>
        <DynamicTabStatusProvider>
          <Component {...pageProps} />
        </DynamicTabStatusProvider>
      </DynamicAuthProvider>
    </>
  );
}

export default MyApp;
