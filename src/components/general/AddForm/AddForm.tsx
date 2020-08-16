import React, {useEffect} from 'react';
import {useForm}          from "react-hook-form";
import {postsAPI}         from "../../../api/api";
import {auth}             from "../../../service/firebase";

export const AddForm = () => {

   const {register, handleSubmit, setValue, errors} = useForm({
      /*validationSchema: addModalSchema*/
   });

   useEffect(() => {
      try {
         let response = postsAPI.getPosts();
      } catch (error) {
         console.log(error)
      }
   }, [])

   const onSubmit = async (data:any) => {
      const {imgLink, imgCaption} = data;
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

         {errors.imgLink && <span>This field is required</span>}



         <input type="submit" />


         <button onClick={deletePost}>DELETE</button>
      </form>
   );
}

