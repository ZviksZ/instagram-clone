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

export interface PostData {
   imgLink: string | null
   imgCaption: string | null
   userId: string | undefined
   userPhoto: string | null | undefined
   userName: string | null | undefined
}

export interface SetPostsAction {
   type: typeof SET_POSTS;
   payload: IPostObject;
}

export type PostsActionTypes = SetPostsAction;
