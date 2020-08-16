import { auth }      from "./firebase";
import {db, storage} from "./firebase.js";

export function signup(email, password) {
   console.log(auth())
   return auth().createUserWithEmailAndPassword(email, password);
}

export function signin(email, password) {
   return auth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
   const provider = new auth.GoogleAuthProvider();
   return auth().signInWithPopup(provider);
}

export function signInWithGitHub() {
   const provider = new auth.GithubAuthProvider();
   return auth().signInWithPopup(provider);
}

export function logout() {
   return auth().signOut();
}

export function listAllUsers(nextPageToken) {
   console.log(storage)
   console.log(db)
   console.log(auth())
   console.log(db().ref('users'))
}

