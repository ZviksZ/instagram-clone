import React           from "react";
import {SET_USER_DATA} from "../../types/auth-types";
import authReducer     from "../auth-reducer";

describe("AuthReducer", () => {
   it("should set obj in currentUser ", () => {
      let initialState = {
         currentUser: null
      }
      const action = {
         type: SET_USER_DATA,
         payload: {
            name: 'str',
            email: 'str',
            photoUrl: 'str',
            uid: 'str'
         }
      }

      expect(authReducer(initialState, action)).toEqual({
         ...initialState,
         currentUser: {
            name: 'str',
            email: 'str',
            photoUrl: 'str',
            uid: 'str'
         }
      })

   });

   it("should set null in currentUser ", () => {
      let initialState = {
         currentUser: {
            name: 'str',
            email: 'str',
            photoUrl: 'str',
            uid: 'str'
         }
      }
      const action = {
         type: SET_USER_DATA,
         payload: null
      }

      expect(authReducer(initialState, action)).toEqual({
         ...initialState,
         currentUser: null
      })

   });
});
