import { Heading1 } from "@/components/atoms/Heading1";
import { LinkText } from "@/components/atoms/LinkText";
import { Head } from "@/components/organisms/Head";
import { useLocale } from "@/hooks/useLocale";

export const Custom404 = () => {
  const { text } = useLocale();
  return (
    <>
      <Head title="404 Not Found | Pay History" />
      <div className="px-4">
        <Heading1>404 Not Found</Heading1>
        <p className="pb-8">{text.PAGE_NOT_FOUND}</p>
        <LinkText text={text.RETURN_TO_HOME} href="/" />
      </div>
    </>
  );
};
