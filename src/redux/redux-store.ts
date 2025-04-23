import { combineReducers, configureStore } from "@reduxjs/toolkit";
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
  app: appReducer
})

export type RootState = ReturnType<typeof rootReducer>;
const store = configureStore({ reducer: rootReducer })

type PropsTypes<T> = T extends {[key:string]: infer U }? U: never

export type InferActionsTypes<T extends {[key:string]: (...args:any[])=>any }> = ReturnType<PropsTypes<T>>

export default store