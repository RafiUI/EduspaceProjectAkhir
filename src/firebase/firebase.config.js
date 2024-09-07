// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAcC9Gw4up5IJfkl9J4SrXd7YxQPi7Uh74",
  authDomain: "eduspace-project.firebaseapp.com",
  projectId: "eduspace-project",
  storageBucket: "eduspace-project.appspot.com",
  messagingSenderId: "111870088889",
  appId: "1:111870088889:web:9c9a50bede2145a5d26d68",
  measurementId: "G-2036D5LE51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;