import Header from "components/common/Header";
import LinkText from "components/common/LinkText";
import { useLocale } from "hooks/locale";

const Custom404 = () => {
  const { text } = useLocale();
  return (
    <>
      <Header />
      <main>
        <h1>404 Not Found</h1>
        <p className="pb-8">{text.PAGE_NOT_FOUND}</p>
        <LinkText text="Return To Home" href="/" />
      </main>
    </>
  );
};

export default Custom404;
