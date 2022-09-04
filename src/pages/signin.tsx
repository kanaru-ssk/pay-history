import Head from "next/head";

import Header from "components/Header";
import Signin from "components/Signin";

const SigninPage = () => {
  return (
    <>
      <Head>
        <title>サインイン | Pay History</title>
      </Head>

      <Header />
      <main>
        <Signin />
      </main>
    </>
  );
};

export default SigninPage;
