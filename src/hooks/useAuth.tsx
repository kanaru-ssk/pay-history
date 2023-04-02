// share authentication state with useContext

import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { auth, db } from "@/libs/firebase";
import { type User, type DBUser } from "@/types/firebase";

type AuthContextProps = {
  authUser: User | null;
  dbUser: DBUser | null;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type Node = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: Node) => {
  const [authUser, setAuthUser] = useState<User | null>(auth.currentUser);
  const [dbUser, setDBUser] = useState<DBUser | null>(null);

  // update authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        setAuthUser(user);
      } else {
        const { signInAnonymously } = await import("firebase/auth");
        signInAnonymously(auth);
      }
    });
    return () => unsubscribe();
  }, []);

  // update user in database
  useEffect(() => {
    if (authUser) {
      const unsubscribe = onSnapshot(
        doc(db, "users", authUser.uid),
        async (doc) => {
          if (doc.exists()) {
            const user: DBUser = {
              docId: doc.id,
              atCreated: doc.data().atCreated,
              atUpdated: doc.data().atUpdated,
              budget: doc.data().budget,
              email: doc.data().email,
              isAnonymous: doc.data().isAnonymous,
            };
            setDBUser(user);
          } else {
            // create new user
            const { createUser } = await import("@/libs/firebase");
            createUser(auth.currentUser);
          }
        }
      );
      return () => unsubscribe();
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser: authUser, dbUser: dbUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
