import firebase from "firebase/compat/app"
import "firebase/compat/auth"
//import {getAnalytics, logEvent} from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAmhT5TILw0JQzwi76mRrZW4Ao2ufFQn5A",
    authDomain: "signup-and-login-auth.firebaseapp.com",
    projectId: "signup-and-login-auth",
    storageBucket: "signup-and-login-auth.appspot.com",
    messagingSenderId: "1027507569031",
    appId: "1:1027507569031:web:cace25a833198607f05322",
    measurementId: "G-6PV5CTT30H"
  }
export default firebaseConfig;

export const firebaseApp = firebase.initializeApp(firebaseConfig)

//export const analytics = firebase.analytics();


