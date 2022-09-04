import Head from "next/head";

import Header from "components/Header";
import Home from "components/Home";
import Tab from "components/Tab";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Pay History</title>
      </Head>

      <Header />
      <Tab />
      <main>
        <Home />
      </main>
    </>
  );
};

export default HomePage;
