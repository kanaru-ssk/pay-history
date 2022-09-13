// firebase初期化
import { getAnalytics } from "firebase/analytics";
import { initializeApp, getApp, getApps } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { initializeFirestore, getFirestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = !getApps().length ? initializeApp(config) : getApp();

const auth = getAuth();

setPersistence(auth, browserLocalPersistence);

const db =
  getFirestore() ??
  initializeFirestore(app, { ignoreUndefinedProperties: true });

const analytics = typeof window !== "undefined" ? getAnalytics(app) : undefined;

export { auth, db, analytics };
