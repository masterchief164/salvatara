const { initializeApp } = require("firebase/app")
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzQV0QU-D61WSNtGgVKfQt1esPr9j-sQc",
  authDomain: "salvatara-6cba7.firebaseapp.com",
  projectId: "salvatara-6cba7",
  storageBucket: "salvatara-6cba7.appspot.com",
  messagingSenderId: "531911545008",
  appId: "1:531911545008:web:92899c4346bc091e89eb75",
  measurementId: "G-20DBQV52BJ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)