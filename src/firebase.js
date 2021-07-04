// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB1I6XwBg7o4-7wHWEDhoNRXxXlVbMAqUo",
    authDomain: "whatsapp-clone-ee45a.firebaseapp.com",
    projectId: "whatsapp-clone-ee45a",
    storageBucket: "whatsapp-clone-ee45a.appspot.com",
    messagingSenderId: "574024393847",
    appId: "1:574024393847:web:c2cf02787fe08a15bbd272",
    measurementId: "G-1DDG0XXKL2"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebaseApp.auth();
  const provider = new  firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;