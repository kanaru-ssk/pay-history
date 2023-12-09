import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { queryToDocId, dateToDocId } from "@/libs/convert";

export function useDocId() {
  const searchParams = useSearchParams();
  const month = searchParams.get("month")?.toString();
  const [docId, setDocId] = useState<string>(() => queryToDocId(month));
  const [prevDocId, setPrevDocId] = useState<string>(() => {
    const thisDate = new Date(docId);
    const prevDate = new Date(thisDate.getFullYear(), thisDate.getMonth() - 1);
    return dateToDocId(prevDate);
  });
  const [nextDocId, setNextDocId] = useState<string>(() => {
    const thisDate = new Date(docId);
    const nextDate = new Date(thisDate.getFullYear(), thisDate.getMonth() + 1);
    return dateToDocId(nextDate);
  });

  useEffect(() => {
    setDocId(queryToDocId(month));
  }, [month]);

  useEffect(() => {
    const thisDate = new Date(docId);
    const prevDate = new Date(thisDate.getFullYear(), thisDate.getMonth() - 1);
    const nextDate = new Date(thisDate.getFullYear(), thisDate.getMonth() + 1);
    setPrevDocId(dateToDocId(prevDate));
    setNextDocId(dateToDocId(nextDate));
  }, [docId]);

  return { docId, prevDocId, nextDocId };
}
