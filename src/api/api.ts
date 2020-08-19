import {auth, db, storage} from "../service/firebase";



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
   getPosts () {
     //return db.ref("posts").on("value", snapshot => snapshot.val());
     return db.ref("posts").once('value');
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
