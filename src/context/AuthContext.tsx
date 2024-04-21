"use client";

import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "@/firebase/FireBase";

export const AuthContext = createContext<any>(null);

export const UserAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  type User = {};

  const [user, setUser] = useState<User | null>(null);

  const userLogIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const userLogOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, userLogIn, userLogOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
