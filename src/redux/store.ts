import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkMiddleware}                        from "redux-thunk";
import {AppActions}                                    from "../types/common_types";
import authReducer                                     from "./auth-reducer";
import postsReducer                                    from "./posts-reducer";
import appReducer                                      from "./app-reducer";

let reducers = combineReducers({
   app: appReducer,
   auth: authReducer,
   posts: postsReducer
});

export type AppState = ReturnType<typeof reducers>;


let store = createStore(reducers, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>));


export default store;
