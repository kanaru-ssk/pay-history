export type User = import("firebase/auth").User;
export type AuthError = import("firebase/auth").AuthError;

export type FieldValue = import("firebase/firestore").FieldValue;
export type Timestamp = import("firebase/firestore").Timestamp;

export type DBUser = {
  docId: string;
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
  budget: number;
  email?: string;
  isAnonymous?: boolean;
};

export type MonthlyData = {
  docId: string;
  atCreated: Timestamp | FieldValue;
  atUpdated: Timestamp | FieldValue;
  budget: number;
  payments: Payment[];
};

export type Payment = {
  atCreated: Timestamp;
  atUpdated: Timestamp;
  atPaid: Timestamp;
  price: number;
};

export function isAuthError(arg: any): arg is AuthError {
  if ("code" in arg && "message" in arg) {
    return true;
  }
  return false;
}
