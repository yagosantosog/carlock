'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { initializeFirebase } from './index';
import type { Auth, User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

const sdks = initializeFirebase();

interface FirebaseContextState {
  auth: Auth;
  firestore: Firestore;
  storage: FirebaseStorage;
  user: User | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextState | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(sdks.auth, (u) => {
      setUser(u);
      setLoading(false);
    }, (err) => {
      console.error('onAuthStateChanged error', err);
      setUser(null);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth: sdks.auth, firestore: sdks.firestore, storage: sdks.storage, user, loading }}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const ctx = useContext(FirebaseContext);
  if (!ctx) throw new Error('useFirebase must be used within FirebaseProvider.');
  return ctx;
}

export function useAuth() {
  return useFirebase().auth;
}

export function useUser() {
  const { user, loading } = useFirebase();
  return { user, loading };
}

export function useFirestore() {
  return useFirebase().firestore;
}

export function useStorage() {
  return useFirebase().storage;
}
