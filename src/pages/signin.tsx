import Head from "next/head";

import SignIn from "components/pages/SignIn";

const SigninPage = () => {
  return (
    <>
      <Head>
        <title>サインイン | Pay History</title>
      </Head>

      <SignIn />
    </>
  );
};

export default SigninPage;
