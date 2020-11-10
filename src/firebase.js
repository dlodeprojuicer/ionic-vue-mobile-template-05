// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "firebase/database";
import "firebase/analytics";


// replace this config with your own.
const firebaseConfig = {
  apiKey: "AIzaSyAzJdnBy6MXtYlpGsmm70FJA-v9aiBPUdw",
  authDomain: "techconf-db-template.firebaseapp.com",
  databaseURL: "https://techconf-db-template.firebaseio.com",
  projectId: "techconf-db-template",
  storageBucket: "techconf-db-template.appspot.com",
  messagingSenderId: "862672279483",
  appId: "1:862672279483:web:f2e02196bafe0a217d969e",
  measurementId: "G-ZTFP3035QL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
