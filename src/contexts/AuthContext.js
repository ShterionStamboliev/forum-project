import React, { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from 'firebase/auth'
import { auth } from "../config/firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({});

    const createUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    const signOutUser = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe;
    }, []);

    return (
        <UserContext.Provider value={{ createUser, user, signOutUser, signInUser }}>
            {children}
        </UserContext.Provider>
    );
};


export const UseAuth = () => {
    return useContext(UserContext);
};