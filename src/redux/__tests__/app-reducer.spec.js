// eslint-disable-next-line
import React         from "react";
import {SET_MESSAGE} from "../../types/app-types";
import appReducer    from "../app-reducer";


describe("AppReducer", () => {
   it("should set obj in message ", () => {
      let initialState = {
         message: null
      }
      const action = {
         type: SET_MESSAGE,
         payload: {
            type: 'error',
            text: 'Error'
         }
      }

      expect(appReducer(initialState, action)).toEqual({
         ...initialState,
         message: {
            type: 'error',
            text: 'Error'
         }
      })

   });

   it("should set null in message ", () => {
      let initialState = {
         message: {
            type: 'error',
            text: 'Error'
         }
      }
      const action = {
         type: SET_MESSAGE,
         payload: null
      }

      expect(appReducer(initialState, action)).toEqual({
         ...initialState,
         message: null
      })

   });
});
