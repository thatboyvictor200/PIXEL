// firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLXNrpiijDP2dORxKTy8TIVQ0MEkOEznk",
  authDomain: "pixel-7ad5f.firebaseapp.com",
  projectId: "pixel-7ad5f",
  storageBucket: "pixel-7ad5f.firebasestorage.app",
  messagingSenderId: "981180748568",
  appId: "1:981180748568:web:347b37837e0890bf54046d",
  measurementId: "G-E568SZTBB5"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export the auth instance for use in your app
export const auth = getAuth(app);

// (Optional) Analytics, only if running in a browser and you care to use it
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// Optional: Export RecaptchaVerifier in case you need to manually use it
export { RecaptchaVerifier };
