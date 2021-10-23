import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCdXQ80TOblrwSFH85kcSv0mmHaLuRzCkw",
    authDomain: "fir-8781c.firebaseapp.com",
    projectId: "fir-8781c",
    storageBucket: "fir-8781c.appspot.com",
    messagingSenderId: "279535442489",
    appId: "1:279535442489:web:3b752c6cab7de823f80be8",
    measurementId: "G-NH9H69CQX7"
  };

export default firebase.initializeApp(firebaseConfig)