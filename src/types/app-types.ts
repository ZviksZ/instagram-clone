export const SET_MESSAGE = 'instagram-clone/app/SET_MESSAGE';

export interface IAppInitialState {
   message: IMessage | null
}

export interface IMessage {
   type: "success" | "info" | "warning" | "error" | undefined
   text: string
}

export interface SetMessageAction {
   type: typeof SET_MESSAGE;
   payload: IMessage | null;
}

export type AppActionTypes = SetMessageAction;
