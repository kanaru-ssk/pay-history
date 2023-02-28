import Head from "next/head";

import SignIn from "components/pages/SignIn";
import { useLocale } from "hooks/locale";

const SignInPage = () => {
  const { text } = useLocale();
  return (
    <>
      <Head>
        <title>{text.SIGN_IN} | Pay History</title>
      </Head>

      <SignIn />
    </>
  );
};

export default SignInPage;
