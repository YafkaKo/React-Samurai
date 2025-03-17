import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer
})

const store = configureStore({ reducer: rootReducer })

export default store