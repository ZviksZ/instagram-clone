import React                                             from "react";
import {SET_POSTS, SET_PROFILE_MODAL, SET_PROFILE_POSTS} from "../../types/posts-types";
import postsReducer                                      from "../posts-reducer";

describe("PostsReducer", () => {
   let initialState;
   beforeEach(() => {
      initialState = {
         posts: {},
         profilePosts: {},
         profileModalItem: null
      }
   })

   it("should set posts", () => {
      const action = {
         type: SET_POSTS,
         payload: {
            'id1' : {
               imgCaption: 'str',
               imgLink: 'str',
               userId: 'str',
               userPhoto: 'str',
               userName: 'str'
            },
            'id2' : {
               imgCaption: 'str',
               imgLink: 'str',
               userId: 'str',
               userPhoto: 'str',
               userName: 'str'
            }
         }
      }

      expect(postsReducer(initialState, action)).toEqual({
         ...initialState,
         posts: {
            'id1' : {
               imgCaption: 'str',
               imgLink: 'str',
               userId: 'str',
               userPhoto: 'str',
               userName: 'str'
            },
            'id2' : {
               imgCaption: 'str',
               imgLink: 'str',
               userId: 'str',
               userPhoto: 'str',
               userName: 'str'
            }
         }
      })
   });

   it("should set profile posts", () => {
      const action = {
         type: SET_PROFILE_POSTS,
         payload: {
            'id1' : {
               imgCaption: 'str',
               imgLink: 'str',
               userId: 'str',
               userPhoto: 'str',
               userName: 'str'
            },
            'id2' : {
               imgCaption: 'str',
               imgLink: 'str',
               userId: 'str',
               userPhoto: 'str',
               userName: 'str'
            }
         }
      }

      expect(postsReducer(initialState, action)).toEqual({
         ...initialState,
         profilePosts: {
            'id1' : {
               imgCaption: 'str',
               imgLink: 'str',
               userId: 'str',
               userPhoto: 'str',
               userName: 'str'
            },
            'id2' : {
               imgCaption: 'str',
               imgLink: 'str',
               userId: 'str',
               userPhoto: 'str',
               userName: 'str'
            }
         }
      })
   });

   it("should set profile modal", () => {
      const action = {
         type: SET_PROFILE_MODAL,
         payload: {
            post: {
               imgCaption: 'str',
               imgLink: 'str',
               userId: 'str',
               userPhoto: 'str',
               userName: 'str'
            },
            itemId: 'str'
         }
      }

      expect(postsReducer(initialState, action)).toEqual({
         ...initialState,
         profileModalItem: {
            post: {
               imgCaption: 'str',
               imgLink: 'str',
               userId: 'str',
               userPhoto: 'str',
               userName: 'str'
            },
            itemId: 'str'
         }
      })
   });

   it("should set profile modal to null", () => {
      const action = {
         type: SET_PROFILE_MODAL,
         payload: null
      }

      expect(postsReducer(initialState, action)).toEqual({
         ...initialState,
         profileModalItem: null
      })
   });
});
