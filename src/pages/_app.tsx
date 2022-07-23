import "styles/globals.css";
import type { AppProps } from "next/app";

import Header from "components/Header";
import Tab from "components/Tab";
import { AuthProvider } from "hooks/auth";
import { initFirebase } from "libs/initFirebase";

function MyApp({ Component, pageProps }: AppProps) {
  initFirebase();

  return (
    <AuthProvider>
      <Header />
      <Tab />;
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
