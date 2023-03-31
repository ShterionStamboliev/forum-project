import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDHMEReu674r5KPRaoxWluQj2cbilbz5p4",
    authDomain: "forum-development-95343.firebaseapp.com",
    projectId: "forum-development-95343",
    storageBucket: "forum-development-95343.appspot.com",
    messagingSenderId: "308657878744",
    appId: "1:308657878744:web:c1473abbc9ee6308c1c9ad"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;