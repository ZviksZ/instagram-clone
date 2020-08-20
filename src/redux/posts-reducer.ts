import {Dispatch}                                                                             from "redux";
import {AppActions}                                                                   from "../types/common_types";
import {AppState}                                                                     from "./store";
import {IPostsInitialState, PostsActionTypes, SET_POSTS, SetPostsAction, IPostObject} from "../types/posts-types";
import {CurrentUser}                                                                  from "../types/auth-types";
import {auth, db, storage}                                                            from "../service/firebase";
import {setMessage}                                                                   from "./app-reducer";



let initialState: IPostsInitialState = {
   posts: {}
}

const postsReducer = (state = initialState, action: PostsActionTypes) => {
   switch (action.type) {
      case SET_POSTS:
         return {
            ...state,
            posts: action.payload
         }
      default:
         return state;
   }
}

export const setPosts = (posts: IPostObject): SetPostsAction => ({type: SET_POSTS, payload: posts})


export const getPosts = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      db.ref("posts").on('value', snapshot => {
         dispatch(setPosts(snapshot.val()));
      })
   } catch (error) {
      setMessage({type: 'error', text: 'Error. Try again, please.'})
   }
}

export const addPost = (user: CurrentUser, file: any, imgCaption: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let {uid, photoURL, displayName} = auth()?.currentUser || {};
      let imgLink = ``;

      await storage
      .ref()
      .child(`/posts/${uid || ''}/${file.name}`)
      .put(file).snapshot.ref.getDownloadURL().then(function(downloadURL) {
            imgLink = downloadURL;
      })

      await db.ref("posts").push({
         imgLink,
         imgCaption,
         userId: uid,
         userPhoto: photoURL,
         userName: displayName
      });


      //dispatch(setPosts(posts.val()));
   } catch (error) {

      setMessage({type: 'error', text: 'Error. Try again, please.'})
   }
}

export default postsReducer;
