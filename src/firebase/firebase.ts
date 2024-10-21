// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7CaARbWqXBoyh6pKIwhPvt-6YjodWt9w",
  authDomain: "chatsvelte.firebaseapp.com",
  projectId: "chatsvelte",
  storageBucket: "chatsvelte.appspot.com",
  messagingSenderId: "281399008541",
  appId: "1:281399008541:web:72c99c1b92f921b12055f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);