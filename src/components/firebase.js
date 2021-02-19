import firebase from "firebase/app";
import "@firebase/firestore";

  var firebaseConfig = {
    apiKey: "AIzaSyBLlvogevXLmI_pB08ik_BYaV7Zsa8a39w",
    authDomain: "todo-2b3ab.firebaseapp.com",
    projectId: "todo-2b3ab",
    storageBucket: "todo-2b3ab.appspot.com",
    messagingSenderId: "781679146468",
    appId: "1:781679146468:web:b8895a5891cea3b857c3f1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  export default firebase;