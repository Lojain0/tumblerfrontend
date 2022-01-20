import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDarp2p8JMaklbAAJvC4-ANC6kY5VBm6RA",
  authDomain: "lojain-5cdf8.firebaseapp.com",
  projectId: "lojain-5cdf8",
  storageBucket: "lojain-5cdf8.appspot.com",
  messagingSenderId: "121162111180",
  appId: "1:121162111180:web:8aade617ef53ae6ae40a69",
};

firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export { projectStorage, projectFirestore, timestamp, firebase };
