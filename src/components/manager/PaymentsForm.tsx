import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import type { MonthlyData } from "types/firebase";

import { useAuth } from "hooks/auth";
import { addPayment } from "libs/monthlyData";

type Props = {
  thisMonthData: MonthlyData;
};

const PaymentsForm = ({ thisMonthData }: Props) => {
  const { authUser } = useAuth();
  const router = useRouter();

  const [date, setDate] = useState<string>("");
  const [firstDate, setFirstDate] = useState<string>("");
  const [lastDate, setLastDate] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  const { id } = router.query;

  useEffect(() => {
    if (id === undefined) {
      const now = new Date();
      setDate(now.toISOString().split("T")[0]);
      setFirstDate(
        new Date(now.getFullYear(), now.getMonth(), 1, 12)
          .toISOString()
          .split("T")[0]
      );
      setLastDate(
        new Date(now.getFullYear(), now.getMonth() + 1, 0, 12)
          .toISOString()
          .split("T")[0]
      );
    } else if (typeof id === "object") {
      const split = id[0].split("-");
      const toNum = split.map((value) => {
        return Number(value);
      });
      const now = new Date(toNum[0], toNum[1] - 1, 1);
      setDate(
        new Date(now.getFullYear(), now.getMonth() + 1, 0, 12)
          .toISOString()
          .split("T")[0]
      );
      setFirstDate(
        new Date(now.getFullYear(), now.getMonth(), 1, 12)
          .toISOString()
          .split("T")[0]
      );
      setLastDate(
        new Date(now.getFullYear(), now.getMonth() + 1, 0, 12)
          .toISOString()
          .split("T")[0]
      );
    }
  }, [id]);

  // 支払い追加
  const onSumitPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (thisMonthData && isReady) {
      addPayment(authUser, thisMonthData, price, new Date(date));
      setPrice(0);
      setIsReady(false);

      if (id === undefined) {
        setDate(new Date().toISOString().split("T")[0]);
      } else if (typeof id === "object") {
        const split = id[0].split("-");
        const toNum = split.map((value) => {
          return Number(value);
        });
        const now = new Date(toNum[0], toNum[1] - 1, 1);
        setDate(
          new Date(now.getFullYear(), now.getMonth() + 1, 0, 12)
            .toISOString()
            .split("T")[0]
        );
      }
    }
  };

  const toHalfWidth = (value: string): string => {
    if (!value) return value;

    return String(value).replace(/[！-～]/g, (all: string): string => {
      return String.fromCharCode(all.charCodeAt(0) - 0xfee0);
    });
  };

  // 支払い金額入力
  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const half = toHalfWidth(e.target.value);
    const removed = half.replace(/,/g, "");
    const pattern = /^\d*$/;
    if (pattern.test(removed)) {
      const toNum = Number(removed);
      setPrice(toNum);
      if (0 < toNum) {
        setIsReady(true);
      } else {
        setIsReady(false);
      }
    } else {
      setPrice(0);
    }
  };

  // 支払い日入力
  const onChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  return (
    <form onSubmit={onSumitPayment} className="sticky bottom-0 bg-white">
      <div className="flex w-full items-center gap-2 py-2">
        <input
          type="date"
          min={firstDate}
          max={lastDate}
          value={date}
          onChange={onChangeDate}
          className="h-12 w-full flex-1 rounded-lg border-2 border-gray bg-white px-5 py-3 leading-5"
        />

        <input
          type="text"
          inputMode="numeric"
          placeholder="支出額を入力してください。"
          value={price.toLocaleString()}
          onChange={onChangePrice}
          className="h-12 w-full flex-1 rounded-lg border-2 border-gray px-5 py-3 text-right leading-5"
        />
      </div>

      <div className="pb-2 text-center">
        <button
          className={
            (isReady ? "font-bold text-main-color" : "text-gray") +
            " h-12 w-full rounded-3xl bg-light-gray text-center"
          }
        >
          支払追加
        </button>
      </div>
    </form>
  );
};

export default PaymentsForm;
