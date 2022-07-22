export type User = import("firebase/auth").User;

export type FieldValue = import("firebase/firestore").FieldValue;
export type Timestamp = import("firebase/firestore").Timestamp;

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type MonthlyData = {
  docId: string;
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
  month: Month;
  budget: number;
  payments: Payment[];
};

type Payment = {
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
  price: number;
};
