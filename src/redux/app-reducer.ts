import { authThunkCreator } from "./auth-reducer.ts";
import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { InferActionsTypes, RootState } from "./redux-store.ts";

type ActionTypesApp = InferActionsTypes<typeof actionsApp>

export type AppDispatch = ThunkDispatch<RootState, unknown, ActionTypesApp>;


type InitialStateType = {
  initialized: boolean
}

const initialState: InitialStateType = {
  initialized: false,
};



const appReducer = (state:InitialStateType = initialState, action:ActionTypesApp):InitialStateType => {
  switch (action.type) {
    case 'SET_INIT':
      return {
        ...state,
        initialized: action.initialized,
      };

    default:
      return state;
  }
};

export const actionsApp = {
handleInit: (initialized:boolean) => ({
  type: 'SET_INIT',
  initialized
})
}

export const initialize = ():ThunkAction<void,RootState,unknown,ActionTypesApp>=> async (dispatch)=>{
    await dispatch(authThunkCreator());
   dispatch(actionsApp.handleInit(true))
}

export default appReducer;
