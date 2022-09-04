import Head from "next/head";

import Header from "components/Header";
import Signup from "components/Signup";

const SignupPage = () => {
  return (
    <>
      <Head>
        <title>サインアップ | Pay History</title>
      </Head>

      <Header />
      <main>
        <Signup />
      </main>
    </>
  );
};

export default SignupPage;
