import { useEffect, useState } from "react";

import Head from "next/head";

import type { GetServerSideProps } from "next";
import type { MonthlyData } from "types/firebase";

import Introduction from "components/Introduction";
import Manager from "components/Manager";
import Tab from "components/Tab";
import { useAuth } from "hooks/auth";
import {
  getMonthlyData,
  getThisMonthDocId,
  updateBudget,
  addPayment,
} from "libs/monthlyData";

type Props = {};

const Home = ({}: Props) => {
  const user = useAuth();

  return (
    <div>
      <Head>
        <title>pay history</title>
        <meta
          name="description"
          content="カードの予算管理を簡単にしましょう! カード明細は反映に時間がかかってしまい、今いくら使ったのか把握するのは難しいですよね。pay historyを使えば月の予算とその月に使った金額を簡単に管理できます。"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Manager />
    </div>
  );
};

export default Home;
