import {IAppInitialState, SET_MESSAGE, AppActionTypes, IMessage, SetMessageAction} from "../types/app-types";
import {Dispatch}                                                                  from "redux";
import {AppActions}                                                                from "../types/common_types";
import {AppState}                                                                  from "./store";


let initialState: IAppInitialState  = {
   message: null
}

const appReducer = (state = initialState, action: AppActionTypes) => {
   switch (action.type) {
      case SET_MESSAGE:
         return {
            ...state,
            message: action.payload
         }
      default:
         return state;
   }
}

export const setMessageData = (message: IMessage | null): SetMessageAction => ({type: SET_MESSAGE, payload: message})


export const setMessage = (message: IMessage) => async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {

   dispatch(setMessageData(message))

   setTimeout(() => {
      dispatch(setMessageData(null))
   }, 3000)
}


export default appReducer;
