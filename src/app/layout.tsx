import { Header } from "@/components/ui/contents/Header";
import { AuthProvider } from "@/hooks/useAuth";
import { ModalProvider } from "@/hooks/useModal";
import { SlideInProvider } from "@/hooks/useSlideIn";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-950 dark:text-gray-300">
        <AuthProvider>
          <ModalProvider>
            <SlideInProvider>
              <Header />
              <main className="mx-auto max-w-2xl font-light">{children}</main>
            </SlideInProvider>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
