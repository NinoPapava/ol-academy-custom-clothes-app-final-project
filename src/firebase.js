import firebase from "firebase/compat/app";
import "firebase/compat/database";

const ENV = process.env;

const config = {
  apiKey: ENV.REACT_APP_FIREBASE_API_KEY,
  authDomain: ENV.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: ENV.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: ENV.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: ENV.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: ENV.REACT_APP_FIREBASE_APP_ID,
  databaseURL:
    "https://ol-academy-project-default-rtdb.europe-west1.firebasedatabase.app",
};

const firebaseApp = firebase.initializeApp(config);
const database = firebaseApp.database();

export default database;