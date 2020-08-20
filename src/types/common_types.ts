import {AuthActionTypes} from "./auth-types";
import {PostsActionTypes} from "./posts-types";
import {AppActionTypes} from "./app-types";

export type AppActions = AuthActionTypes | PostsActionTypes | AppActionTypes;
