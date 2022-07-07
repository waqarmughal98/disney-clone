import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCOPpurrzuzY8QPJ-T0uCIfG9s-qgjdjt4",
  authDomain: "disney-clone-83b18.firebaseapp.com",
  projectId: "disney-clone-83b18",
  storageBucket: "disney-clone-83b18.appspot.com",
  messagingSenderId: "754354307049",
  appId: "1:754354307049:web:2343cda47186b3719e1578",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
