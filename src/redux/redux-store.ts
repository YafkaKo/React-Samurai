import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import profileReducer from "./profile-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import usersReducer from "./users-reducer.ts";
import authReducer from "./auth-reducer.ts";
import appReducer from "./app-reducer.ts";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

const store = configureStore({ reducer: rootReducer });

export default store;

export type RootState = ReturnType<typeof rootReducer>;


export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never 

export type ThunkActionType<
  A extends Action,
  ReturnType = Promise<void>
> = ThunkAction<ReturnType, RootState, unknown, A>;
export type ThunkDispatchType<A extends Action> = ThunkDispatch<
  RootState,
  unknown,
  A
>;
