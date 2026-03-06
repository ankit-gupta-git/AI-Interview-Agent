import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-96a38.firebaseapp.com",
  projectId: "interviewiq-96a38",
  storageBucket: "interviewiq-96a38.firebasestorage.app",
  messagingSenderId: "511633766882",
  appId: "1:511633766882:web:1ef01915dda2503ed661bb"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth, provider }