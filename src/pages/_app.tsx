import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Header from "@/components/organisms/Header";
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  // turn off SSR to use sessionStorage
  const DynamicAuthProvider = dynamic(() => import("@/hooks/auth"), {
    ssr: false,
  });
  const DynamicModalProvider = dynamic(() => import("@/hooks/useModal"), {
    ssr: false,
  });

  return (
    <DynamicAuthProvider>
      <DynamicModalProvider>
        <Header />
        <main className="mx-auto max-w-2xl font-light">
          <Component {...pageProps} />
        </main>
      </DynamicModalProvider>
    </DynamicAuthProvider>
  );
};

export default MyApp;
