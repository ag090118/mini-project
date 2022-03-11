import { initializeApp } from "firebase/app";

//import { getAnalytics } from "@react-native-firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBwJBzMDWPD91HeS6DAvbQ8XpraqnBdeZc",
  authDomain: "malware-fbb82.firebaseapp.com",
  projectId: "malware-fbb82",
  storageBucket: "malware-fbb82.appspot.com",
  messagingSenderId: "563669201622",
  appId: "1:563669201622:web:3819e779e144f02fa00f77",
  measurementId: "G-JR5ZRNJ1P0"
};

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//const analytics = getAnalytics(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // const name = result.user.displayName;
      // const email = result.user.email;
      // const profilePic = result.user.photoURL;

      // localStorage.setItem("name", name);
      // localStorage.setItem("email", email);
      // localStorage.setItem("profilePic", profilePic);
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
