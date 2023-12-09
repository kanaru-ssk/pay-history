import { Timestamp } from "firebase/firestore";
import { Payment } from "@/types/firebase";

type Props = {
  price: number;
  date: Date;
};

export function createPayment({ price, date }: Props): Payment {
  const now = Timestamp.now();
  return {
    atCreated: now,
    atUpdated: now,
    atPaid: Timestamp.fromDate(date),
    price: price,
  };
}
