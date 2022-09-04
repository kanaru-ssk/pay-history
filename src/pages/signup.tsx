import Head from "next/head";

import Header from "components/Header";
import SignUp from "components/SignUp";

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>サインアップ | Pay History</title>
      </Head>

      <Header />
      <main>
        <SignUp />
      </main>
    </>
  );
};

export default SignupPage;
