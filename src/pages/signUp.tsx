import Head from "next/head";
import SignUp from "components/pages/SignUp";
import { useLocale } from "hooks/locale";

const SignUpPage = () => {
  const { text } = useLocale();
  return (
    <>
      <Head>
        <title>{text.SIGN_UP} | Pay History</title>
      </Head>

      <SignUp />
    </>
  );
};

export default SignUpPage;
