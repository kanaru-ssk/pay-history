export type User = import("firebase/auth").User;

export type FieldValue = import("firebase/firestore").FieldValue;
export type Timestamp = import("firebase/firestore").Timestamp;

export type DBUser = {
  docId: string;
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
};

export type Month = {
  docId: string;
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
  month: string;
  budget: number;
  payments: Payment[];
};

type Payment = {
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
  price: number;
};
