import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";

import { RecoilRoot } from "recoil";

import "styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // sessionStorageを使用するため、ssrをオフにする。
  const DynamicAuthProvider = dynamic(() => import("hooks/auth"), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <RecoilRoot>
        <DynamicAuthProvider>
          <Component {...pageProps} />
        </DynamicAuthProvider>
      </RecoilRoot>
    </>
  );
};

export default MyApp;
