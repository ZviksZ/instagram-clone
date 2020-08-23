import {AppActionTypes, IAppInitialState, IMessage, SET_MESSAGE, SetMessageAction} from "../types/app-types";


let initialState: IAppInitialState = {
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




export default appReducer;
