import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PaymentsPage } from "./PaymentsPage";
import { Skelton } from "./Skelton";
import { Head } from "@/components/ui/contents/Head";
import { Notification } from "@/components/ui/contents/Notification";
import { useAuth } from "@/hooks/useAuth";
import { useDocId } from "@/hooks/useDocId";
import { useLocale } from "@/hooks/useLocale";
import { getMonthlyData } from "@/libs/firebase";
import { type MonthlyData } from "@/types/firebase";

export const Home = () => {
  const { docId } = useDocId();
  const { query } = useRouter();
  const { changePasswordSuccess } = query;
  const { dbUser } = useAuth();
  const { text } = useLocale();
  const [thisMonthData, setThisMonthData] = useState<
    MonthlyData | null | undefined
  >(undefined);

  // listen to monthly data
  useEffect(() => {
    const unsubscribe = getMonthlyData(dbUser?.docId, docId, setThisMonthData);
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [dbUser, docId]);

  return (
    <>
      <Head />
      <div>
        <Notification
          text={text.PASSWORD_CHANGED}
          show={!!changePasswordSuccess}
        />
        {thisMonthData === undefined ? (
          <Skelton />
        ) : (
          <PaymentsPage thisMonthData={thisMonthData} />
        )}
      </div>
    </>
  );
};