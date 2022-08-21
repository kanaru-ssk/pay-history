// 認証状態をuseContextで共有

import { createContext, useContext, useState, useEffect } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";

import type { User, DBUser } from "types/firebase";

import db from "libs/initFirebase";

type node = {
  children: React.ReactNode;
};

type AuthContextProps = {
  authUser: User | null;
  dbUser: DBUser | null;
};

const AuthContext = createContext<AuthContextProps>({
  authUser: null,
  dbUser: null,
});

// ログイン認証
export const AuthProvider = ({ children }: node) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [dbUser, setDBUser] = useState<DBUser | null>(null);

  const auth = getAuth();

  // 認証ユーザー更新
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (_user: User | null) => {
      if (_user) {
        setAuthUser(_user);
      } else {
        const { signInAnonymously } = await import("firebase/auth");
        signInAnonymously(auth);
      }
    });
    return () => unsubscribe();
  }, [auth, authUser]);

  // DBユーザーデータ更新
  useEffect(() => {
    if (auth.currentUser) {
      const unsubscribe = onSnapshot(
        doc(db, "users", auth.currentUser.uid),
        async (doc) => {
          if (doc.exists()) {
            const _dbUser: DBUser = {
              docId: doc.id,
              atCreated: doc.data().atCreated,
              atUpdated: doc.data().atUpdated,
              budget: doc.data().budget,
            };
            setDBUser(_dbUser);
          } else {
            // 新規ユーザー作成
            const { createUser } = await import("libs/user");
            createUser(auth.currentUser);
          }
        }
      );
      return () => unsubscribe();
    }
  }, [auth.currentUser]);

  return (
    <AuthContext.Provider value={{ authUser: authUser, dbUser: dbUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
