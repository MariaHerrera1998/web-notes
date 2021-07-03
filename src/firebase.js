import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA5fgYMCIv1-DS2ovHTP4a2DoN48heP7dk",
    authDomain: "login-home-svelte.firebaseapp.com",
    projectId: "login-home-svelte",
    storageBucket: "login-home-svelte.appspot.com",
    messagingSenderId: "683024228781",
    appId: "1:683024228781:web:7b9367c6e17b42d0864124"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var auth = firebase.auth();
  var provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider}

 export const db= firebase.firestore();

