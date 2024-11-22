// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo3yYRwkARRNjnZ5RoRRLcCpGRJY-eG64",
  authDomain: "hackaton-5c2b6.firebaseapp.com",
  projectId: "hackaton-5c2b6",
  storageBucket: "hackaton-5c2b6.appspot.com",
  messagingSenderId: "582615818644",
  appId: "1:582615818644:web:9001273701737700ebaf81",
  measurementId: "G-34TLHD0E7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firebaseApp = getApp();
export const storage = getStorage(firebaseApp, "gs://hackaton-5c2b6.appspot.com");
export default firebaseConfig;