import * as firebase from "firebase";
import "firebase/storage";

var firebaseConfig = {
   apiKey: "AIzaSyDSV6hlFJovPYG3ocvwLnzE3aaH1vp3mqQ",
   authDomain: "instagram-clone-23.firebaseapp.com",
   databaseURL: "https://instagram-clone-23.firebaseio.com",
   projectId: "instagram-clone-23",
   storageBucket: "instagram-clone-23.appspot.com",
   messagingSenderId: "512476984320",
   appId: "1:512476984320:web:bfca6fdb6232c970cad4e5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export const auth = firebase.auth;
export const db = firebase.database();
export const storage = firebase.storage();

