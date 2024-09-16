// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOa0WBOD_Viwu83xFisLH6eIfAIhkpae4",
  authDomain: "otp-verification-63b15.firebaseapp.com",
  projectId: "otp-verification-63b15",
  storageBucket: "otp-verification-63b15.appspot.com",
  messagingSenderId: "37954937029",
  appId: "1:37954937029:web:a0e1d0f18a4096966810ac",
  measurementId: "G-6MVXP7RNHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };