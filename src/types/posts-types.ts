export const SET_POSTS = 'instagram-clone/posts/SET_POSTS';

export interface IPostsInitialState {
   posts: IPostObject
}

export interface IPostObject {
   [name: string]: IPosts
}

export interface IPosts {
   imgCaption: string
   imgLink: string
   userId: string
   userPhoto: string
   userName: string
}

export interface SetPostsAction {
   type: typeof SET_POSTS;
   payload: IPostObject;
}

export type PostsActionTypes = SetPostsAction;
