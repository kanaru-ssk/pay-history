import Head from "next/head";

import Header from "components/Header";
import SignIn from "components/SignIn";

const SigninPage = () => {
  return (
    <>
      <Head>
        <title>サインイン | Pay History</title>
      </Head>

      <Header />
      <main>
        <SignIn />
      </main>
    </>
  );
};

export default SigninPage;
