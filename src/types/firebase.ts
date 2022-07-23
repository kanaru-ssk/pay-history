export type User = import("firebase/auth").User;

export type FieldValue = import("firebase/firestore").FieldValue;
export type Timestamp = import("firebase/firestore").Timestamp;

export type DBUser = {
  docId: string;
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
  budget: number;
};
export type MonthlyData = {
  docId: string;
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
  month: number;
  year: number;
  budget: number;
  payments: Payment[];
};

export type Payment = {
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
  price: number;
};
