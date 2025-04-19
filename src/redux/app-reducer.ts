import { authThunkCreator } from "./auth-reducer.ts";
import { ActionType,DispatchConst } from "../types/types.ts";



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

export const initialize = ()=> async (dispatch:any)=>{
    await dispatch(authThunkCreator());
   dispatch(handleInit(true))
}

export default appReducer;
