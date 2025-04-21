import { authThunkCreator } from "./auth-reducer.ts";
import { ActionType,DispatchConst } from "../types/types.ts";
import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "./redux-store.ts";

export type AppDispatch = ThunkDispatch<RootState, unknown, ActionType>;


type InitialStateType = {
  initialized: boolean
}

const initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state:InitialStateType = initialState, action:ActionType):InitialStateType => {
  switch (action.type) {
    case DispatchConst.SET_INIT:
      return {
        ...state,
        initialized: action.initialized,
      };

    default:
      return state;
  }
};

export const handleInit = (initialized:boolean): ActionType => ({
  type: DispatchConst.SET_INIT,
  initialized
});

export const initialize = ():ThunkAction<void,RootState,unknown,ActionType>=> async (dispatch:AppDispatch)=>{
    await dispatch(authThunkCreator());
   dispatch(handleInit(true))
}

export default appReducer;
