import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMYpgomh1AdqoDhi4htuhUEVXWbawOY-I",
  authDomain: "malware-b2c69.firebaseapp.com",
  projectId: "malware-b2c69",
  storageBucket: "malware-b2c69.appspot.com",
  messagingSenderId: "636391048520",
  appId: "1:636391048520:web:b54eb2b9d31b6be1fe1f7d"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
