import { type AppProps } from "next/app";
import { Header } from "@/components/organisms/Header";
import { AuthProvider } from "@/hooks/useAuth";
import { ModalProvider } from "@/hooks/useModal";
import { SlideInProvider } from "@/hooks/useSlideIn";
import "@/styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <SlideInProvider>
          <Header />
          <main className="mx-auto max-w-2xl font-light">
            <Component {...pageProps} />
          </main>
        </SlideInProvider>
      </ModalProvider>
    </AuthProvider>
  );
};

export default MyApp;
