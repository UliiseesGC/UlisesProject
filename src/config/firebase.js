import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyB5NuF9dul7XZesS1fvI3L99A6WFLRlxIY",
    authDomain: "mypersonalproject-a2882.firebaseapp.com",
    projectId: "mypersonalproject-a2882",
    storageBucket: "mypersonalproject-a2882.appspot.com",
    messagingSenderId: "595823196731",
    appId: "1:595823196731:web:bc0073cacfe113b27cba1e"    
}

export const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase);

