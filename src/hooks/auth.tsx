// share authentication state with useContext

import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "@/libs/firebase";
import type { User, DBUser } from "@/types/firebase";

type AuthContextProps = {
  authUser: User | null;
  dbUser: DBUser | null;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type Node = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Node) => {
  const key = "dbUser";
  const [authUser, setAuthUser] = useState<User | null>(auth.currentUser);
  const [dbUser, setDBUser] = useState<DBUser | null>(() => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  });

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
            localStorage.setItem(key, JSON.stringify(user));
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
export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
