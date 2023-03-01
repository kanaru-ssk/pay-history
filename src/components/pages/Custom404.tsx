import LinkText from "components/atoms/LinkText";
import Header from "components/organisms/Header";
import { useLocale } from "hooks/locale";

const Custom404 = () => {
  const { text } = useLocale();
  return (
    <>
      <Header />
      <main>
        <h1>404 Not Found</h1>
        <p className="pb-8">{text.PAGE_NOT_FOUND}</p>
        <LinkText text={text.RETURN_TO_HOME} href="/" />
      </main>
    </>
  );
};

export default Custom404;
