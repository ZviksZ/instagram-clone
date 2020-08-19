import React, {useEffect} from 'react';
import {useForm}          from "react-hook-form";
import {postsAPI}         from "../../../api/api";
import {auth, storage}             from "../../../service/firebase";

export const AddForm = () => {

   const {register, handleSubmit, setValue, errors} = useForm({
      /*validationSchema: addModalSchema*/
   });

   useEffect(() => {
      try {
         let response = postsAPI.getPosts();

         console.log(response)
      } catch (error) {
         console.log(error)
      }
   }, [])

   const onSubmit = async (data:any) => {
      const {imgLink, imgCaption, imgFile} = data;


      let file = imgFile[0];
      let resp = storage.ref().child(`/users/${auth()?.currentUser?.uid || ''}`).put(file);

      resp.snapshot.ref.getDownloadURL().then(function(downloadURL) {
         auth()?.currentUser?.updateProfile({
            photoURL: downloadURL,
            displayName: null
         }).then(function() {
            console.log(auth()?.currentUser?.photoURL)
         }).catch(function(error) {
            // An error happened.
         });
      })




      console.log(imgFile)
     // const userId = auth().currentUser.uid;
      const userId = auth()?.currentUser?.uid || '';
      try {
         let response = await postsAPI.addPost(imgLink, imgCaption, userId);
         console.log(response)
      } catch (error) {
         console.log(error)
      }
   };

   const deletePost = async (e: any) => {
      e.preventDefault()
      try {
         let response = await postsAPI.deletePost('-MEaUpFwFzRvYi8A_jPZ');
         console.log(response)
      } catch (error) {
         console.log(error)
      }

   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <h2>Add Form</h2>
         <input name="imgLink" type="text" ref={register} />
         <input name="imgCaption" type="text" ref={register} />
         <input name="imgFile" type="file" ref={register} />

         {errors.imgLink && <span>This field is required</span>}



         <input type="submit" />


         <button onClick={deletePost}>DELETE</button>
      </form>
   );
}

