import Image from "next/image";
import Heading1 from "components/atoms/Heading1";
import Heading2 from "components/atoms/Heading2";
import { useLocale } from "hooks/locale";
import CtaBtn from "./CtaBtn";

const LandingPage = () => {
  const { text } = useLocale();
  return (
    <>
      <Heading1>Pay History</Heading1>

      <p>{text.LP_TEXT_01}</p>
      <div className="my-12">
        <CtaBtn />
      </div>
      <p className="mb-4">{text.LP_TEXT_02}</p>
      <p className="mb-4">{text.LP_TEXT_03}</p>
      <p className="mb-8">{text.LP_TEXT_04}</p>
      <Image
        src="/img/screenshot.png"
        width={992}
        height={1296}
        alt="screenshot"
        className="drop-shadow-lg"
      />
      <Heading2>{text.HOW_TO_USE}</Heading2>
      <ol className="list-inside list-decimal">
        <li>{text.HOW_TO_USE_01}</li>
        <li>{text.HOW_TO_USE_02}</li>
        <li>{text.HOW_TO_USE_03}</li>
      </ol>
      <div className="my-12">
        <CtaBtn />
      </div>
    </>
  );
};

export default LandingPage;
