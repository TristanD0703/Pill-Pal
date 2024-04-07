import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics'
import { get, getDatabase, child, set, ref, push } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


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
    const auth = getAuth(app);
    getDatabase(app);
    getAnalytics(app);
}
//given an email and password, creates a new account within the email auth provider, then logs in with it.
export function createAccount(email, password) {
    createUserWithEmailAndPassword(getAuth(), email, password).then((userCredential) => {
        createUserData(userCredential.user.uid);
    })
    .catch((error) => {
        console.log(error.message);
        console.log(error.code);
    });
}

//Given a user's email and password, authenticates the user. It can be accessed by getAuth() from Firebase
export function loginEmail(email, password) {
    let user;
    signInWithEmailAndPassword(getAuth(), email, password).then((userCredential) => {
        user = userCredential.user;
        console.log(user.uid);
    })
    .catch((error) => {
        console.log(error.message);
        console.log(error.code);
    });
}

//opens a popup to log in with google, then either creates and/or authenticates an account with the user
export function loginGoogle() {
    let provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider).then((result) => {
        createUserData(result.user.uid);
    });
}

//creates a new user in the database with starting data
export function setNewUserData(name, dateOfBirth, userID) {
    let rootRef = ref(getDatabase());

    const userData = {
        name: name,
        dateOfBirth: dateOfBirth,
        drugsList: {}
    }

    //uploads the data for the new user
    set(child(rootRef, `users/${userID}`), userData);
}

//Creates barebones user with no user data. Will be initialized once user data is provided.
export function createUserData(userID) {
    let rootRef = ref(getDatabase());
    set(child(rootRef, `users/${userID}`), {firstLogin: true});
}

//creates a drug record in the database, then adds a reference to that drug in the user's drug list.
export function addDrugToUser(userID, name, daysToTake, timeToTake, stopDate, dosage, dosageUnit) {
    const rootRef = ref(getDatabase());
    const newDrug = {
        name: name,
        daysToTake: daysToTake,
        timeToTake: timeToTake,
        stopDate: stopDate,
        dosage: dosage,
        dosageUnit: dosageUnit,
        daysTaken: {}
    }

    const drugID = push(child(rootRef, `users/${userID}/drugsList`), newDrug)
}

export function getDrugList(userID) {
    get(ref(getDatabase(), `users/${userID}/drugsList`)).then((snapshot) => {
        if(snapshot.exists()){
            return snapshot.val().values();
        }
        return null;
    })
}