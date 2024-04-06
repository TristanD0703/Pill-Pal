import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


//initializes the database and retuns the app reference (needed for any requests made to firebase)
export function initializeDatabase() {
    const firebaseConfig = {
        apiKey: "AIzaSyDzOQcmYYaIOladtloMmrZQgjhifbn8oqM",
        authDomain: "pill-pall-f0c1c.firebaseapp.com",
        databaseURL: "https://pill-pall-f0c1c-default-rtdb.firebaseio.com",
        projectId: "pill-pall-f0c1c",
        storageBucket: "pill-pall-f0c1c.appspot.com",
        messagingSenderId: "207459359632",
        appId: "1:207459359632:web:e86d7841c37123bbfcb115",
        measurementId: "G-V54NQ5JB2M"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    getAuth(app);
    getDatabase(app);
}

export function createAccount(email, password) {
    let user;
    createUserWithEmailAndPassword(getAuth(), email, password).then((userCredential) => {
        user = userCredential.user;
        console.log(user.uid);
    })
    .catch((error) => {
        console.log(error.message);
        console.log(error.code);
    });
    return user;
}

export function login(email, password) {
    let user;
    signInWithEmailAndPassword(getAuth(), email, password).then((userCredential) => {
        user = userCredential.user;
        console.log(user.uid);
    })
    .catch((error) => {
        console.log(error.message);
        console.log(error.code);
    });
    return user;
}

export function logout() {
    
}