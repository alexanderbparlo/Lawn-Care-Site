import { initializeApp, getApps, getApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseApp() {
  return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

// Lazy accessors — only resolved at call time, never at module evaluation.
// This prevents Firebase from throwing during Next.js server-side rendering
// or static build when NEXT_PUBLIC_* env vars are absent.
let _auth: Auth | null = null;
let _db: Firestore | null = null;

export function getClientAuth(): Auth {
  if (!_auth) {
    const { getAuth } = require("firebase/auth") as typeof import("firebase/auth");
    _auth = getAuth(getFirebaseApp());
  }
  return _auth;
}

export function getClientDb(): Firestore {
  if (!_db) {
    const { getFirestore } = require("firebase/firestore") as typeof import("firebase/firestore");
    _db = getFirestore(getFirebaseApp());
  }
  return _db;
}
