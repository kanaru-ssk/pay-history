import { useEffect, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";

import type { GetServerSideProps } from "next";
import type { MonthlyData } from "types/firebase";

import Introduction from "components/Introduction";
import Tab from "components/Tab";
import { useAuth } from "hooks/auth";
import {
  getMonthlyData,
  getThisMonthDocId,
  updateBudget,
  addPayment,
} from "libs/monthlyData";

const Manager = () => {
  const user = useAuth();
  const router = useRouter();

  const [thisMonthData, setThisMonthData] = useState<MonthlyData | null>(null);
  const [budget, setBudget] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const { id } = router.query;

  useEffect(() => {
    const unsubscribe = getMonthlyData(
      user?.uid,
      id ? id : getThisMonthDocId(),
      setThisMonthData
    );
    return () => {
      if (unsubscribe !== null) unsubscribe();
    };
  }, [user, id, setThisMonthData]);

  useEffect(() => {
    if (thisMonthData?.budget) {
      setBudget(thisMonthData.budget);
      const totalSpending: number = thisMonthData.payments.reduce(
        (sum, value) => {
          return sum + value.price;
        },
        0
      );
      setRemaining(thisMonthData.budget - totalSpending);
    }
  }, [thisMonthData]);

  const onSumitBudget = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (thisMonthData) updateBudget(user, { ...thisMonthData, budget: budget });
  };

  const onSumitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (thisMonthData) {
      addPayment(user, thisMonthData.docId, price);
      setPrice(0);
    }
  };

  if (thisMonthData !== null) {
    return (
      <main>
        <form onSubmit={onSumitBudget}>
          予算 :
          <input
            type="number"
            step="10000"
            value={budget}
            onChange={(e) => {
              setBudget(Number(e.target.value));
            }}
            className="w-24 text-right"
          />
          円<button type="submit">確定</button>
        </form>
        <div>残額 : {remaining}</div>
        <ul>
          {thisMonthData.payments.map((value) => {
            return <li key={value.atCreated.toString()}>{value.price}</li>;
          })}
        </ul>
        <form onSubmit={onSumitPayment}>
          支払い :
          <input
            type="number"
            step="1000"
            value={price}
            onChange={(e) => {
              setPrice(Number(e.target.value));
            }}
            className="w-24 text-right"
          />
          円<button type="submit">確定</button>
        </form>
      </main>
    );
  } else {
    return <Introduction setThisMonthData={setThisMonthData} />;
  }
};

export default Manager;
