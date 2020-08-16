import {auth, db, storage} from "../service/firebase";
import {element}           from "prop-types";



export const authAPI = {
   signup(email: string, password: string) {
      return auth().createUserWithEmailAndPassword(email, password);
   },
   signin(email: string, password: string) {
      return auth().signInWithEmailAndPassword(email, password);
   },
   logout() {
      return auth().signOut();
   }
}

export const postsAPI = {
   getPosts() {
      return db.ref("posts").on("value", snapshot => {
         /*for (let key in snapshot.val()) {
            console.log(key)
            console.log(snapshot.val()[key])
         }*/

         /*Object.keys(snapshot).map(element => element)*/
         return snapshot.val()
      });
   },
   addPost(imgLink: string, imgCaption: string, userId: string) {
      return db.ref("posts").push({
         imgLink,
         imgCaption,
         userId
      });
   },
   deletePost(postId: string) {
      return db.ref(`posts/${postId}`).remove();
   }
}
