import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkMiddleware}                        from "redux-thunk";
import {AppActions}                                    from "../types/common_types";
import authReducer                                     from "./auth-reducer";

let reducers = combineReducers({
   auth: authReducer
});

export type AppState = ReturnType<typeof reducers>;


let store = createStore(reducers, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));


export default store;
