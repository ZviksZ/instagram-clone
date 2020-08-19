import {Dispatch}                                                                from "redux";
import {AppActions}                                                              from "../types/common_types";
import {AppState}                                                                from "./store";
import {postsAPI}                                                                from "../api/api";
import {IPosts, IPostsInitialState, PostsActionTypes, SET_POSTS, SetPostsAction, IPostObject} from "../types/posts-types";

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
      let posts = await postsAPI.getPosts() || {};

      dispatch(setPosts(posts.val()));
   } catch (error) {

   }
}

export default postsReducer;
