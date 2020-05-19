import firebase from "firebase";
import firebaseConfig from "./_Config";

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
export default firebaseApp;
