import { initializeApp } from "firebase/app";
import{getAuth, GoogleAuthProvider} from "firebase/auth"



const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "videoapp-4b060.firebaseapp.com",
  projectId: "videoapp-4b060",
  storageBucket: "videoapp-4b060.appspot.com",
  messagingSenderId: "10786654914",
  appId: "1:10786654914:web:617cf94a720d9470dcc95b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app