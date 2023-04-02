import { type AppProps } from "next/app";
import Header from "@/components/organisms/Header";
import AuthProvider from "@/hooks/auth";
import ModalProvider from "@/hooks/useModal";
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <Header />
        <main className="mx-auto max-w-2xl font-light">
          <Component {...pageProps} />
        </main>
      </ModalProvider>
    </AuthProvider>
  );
};

export default MyApp;
