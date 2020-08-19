import React      from 'react';
import {AddForm}  from "../../general/AddForm/AddForm";
import PostList from "../../PostList/PostList";

export const MainPage = () => {
   return (
      <div>
         <AddForm/>

         <PostList/>
      </div>
   );
}

