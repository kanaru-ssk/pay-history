// 認証状態をuseContextで共有

import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";

import type { User, DBUser } from "types/firebase";

import { auth, db } from "libs/firebase";

type AuthContextProps = {
  authUser: User | null;
  dbUser: DBUser | null;
};

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

type Node = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Node) => {
  const key = "DB_USER";
  const [authUser, setAuthUser] = useState<User | null>(auth.currentUser);
  const [dbUser, setDBUser] = useState<DBUser | null>(() => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  });

  // 認証ユーザー更新
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

  // DBユーザーデータ更新
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
            // 新規ユーザー作成
            const { createUser } = await import("libs/user");
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
