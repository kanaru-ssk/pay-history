import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import Header from "components/organisms/Header";
import "styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // turn off SSR to use sessionStorage
  const DynamicAuthProvider = dynamic(() => import("hooks/auth"), {
    ssr: false,
  });
  const DynamicTabStatusProvider = dynamic(() => import("hooks/tabStatus"), {
    ssr: false,
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <DynamicAuthProvider>
        <DynamicTabStatusProvider>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
        </DynamicTabStatusProvider>
      </DynamicAuthProvider>
    </>
  );
};

export default MyApp;
