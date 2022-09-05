import Head from "next/head";

import SignUp from "components/pages/SignUp";

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>サインアップ | Pay History</title>
      </Head>

      <SignUp />
    </>
  );
};

export default SignupPage;
