import React, { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile
} from 'firebase/auth'
import { auth, db } from "../config/firebase";
import { storage } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

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

export async function uploadImage(file, currentUser, setLoading) {
    const fileRef = ref(storage, `${currentUser.uid}/images/`);
    setLoading(true);
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    await updateProfile(currentUser, {
        photoURL
    });
    await setDoc(doc(db, 'users', currentUser.uid), {
        photo: photoURL
    }, { merge: true })
    setLoading(false);
    alert('Image uploaded');
};


export const UseAuth = () => {
    return useContext(UserContext);
};