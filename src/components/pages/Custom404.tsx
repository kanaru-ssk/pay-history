import LinkText from "components/atoms/LinkText";
import { useLocale } from "hooks/locale";

const Custom404 = () => {
  const { text } = useLocale();
  return (
    <div>
      <h1>404 Not Found</h1>
      <p className="pb-8">{text.PAGE_NOT_FOUND}</p>
      <LinkText text={text.RETURN_TO_HOME} href="/" />
    </div>
  );
};

export default Custom404;
