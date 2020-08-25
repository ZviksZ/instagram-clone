import {Dispatch}                                                                                                               from "redux";
import {AppActions}                                                                                                             from "../types/common_types";
import {AppState}                                                                                                               from "./store";
import {IPostObject, IPostsInitialState, PostsActionTypes, SET_POSTS, SetPostsAction, SET_PROFILE_POSTS, SetProfilePostsAction} from "../types/posts-types";
import {CurrentUser}                                                                                                            from "../types/auth-types";
import {auth, db, storage}                                                                                                      from "../service/firebase";
import {setMessageData}                                                                                                         from "./app-reducer";


let initialState: IPostsInitialState = {
   posts: {},
   profilePosts: {}
}

const postsReducer = (state = initialState, action: PostsActionTypes) => {
   switch (action.type) {
      case SET_POSTS:
         return {
            ...state,
            posts: action.payload
         }
      case SET_PROFILE_POSTS:
         return {
            ...state,
            profilePosts: action.payload
         }
      default:
         return state;
   }
}

export const setPosts = (posts: IPostObject): SetPostsAction => ({type: SET_POSTS, payload: posts})
export const setProfilePosts = (posts: IPostObject): SetProfilePostsAction => ({type: SET_PROFILE_POSTS, payload: posts})


export const getPosts = () => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      db.ref("posts").on('value', snapshot => {
         dispatch(setPosts(snapshot.val()));
      })
   } catch (error) {

      dispatch(setMessageData({type: 'error', text: 'Ошибка. Попробуйте снова'}))
   }
}

export const getProfilePosts = (userId: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {

      await db.ref("posts").orderByChild("userId").startAt(userId).endAt(userId).on('value', snapshot => {
         dispatch(setProfilePosts(snapshot.val()));
      })
   } catch (error) {

      dispatch(setMessageData({type: 'error', text: 'Ошибка. Попробуйте снова'}))
   }
}

export const addPost = (user: CurrentUser, file: any, imgCaption: string) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
   try {
      let {uid, photoURL, displayName} = auth()?.currentUser || {};
      let imgLink = ``;

      let uploadedFile = await storage
         .ref()
         .child(`/posts/${uid || ''}/${file.name}`)
         .put(file);

      await uploadedFile.ref.getDownloadURL().then(downloadURL => {
         imgLink = downloadURL;
      })

      await db.ref("posts").push({
         imgLink,
         imgCaption,
         userId: uid,
         userPhoto: photoURL,
         userName: displayName
      });
   } catch (error) {
      dispatch(setMessageData({type: 'error', text: 'Ошибка. Попробуйте снова'}))
   }
}

export default postsReducer;
