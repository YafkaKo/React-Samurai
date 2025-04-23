import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AuthAPI, ResultCodeEnum } from "../API/API.ts";
import { InferActionsTypes, RootState } from "./redux-store";


type initialStateType = {
  id: null | number,
  email: null | string,
  login: null | string,
  isAuth: boolean,
}

export type AuthStateType = initialStateType

type ActionTypesAuth = InferActionsTypes<typeof actionsAuth>

export type AuthDispatch = ThunkDispatch<RootState, unknown, ActionTypesAuth>;

type AuthThunk<ReturnType = void> =ThunkAction<ReturnType, RootState, unknown, ActionTypesAuth>;


const initialState: initialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};



const authReducer = (state:initialStateType = initialState, action:ActionTypesAuth):initialStateType => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        ...action.data,
        isAuth: action.data?.isAuth ?? true
      };
    default:
      return state;
  }
};

export const actionsAuth = {
handleAuth: (id:number|null, login:string|null, email:string|null, isAuth:boolean) => ({
  type: 'SET_USER_DATA',
  data: { id, email, login, isAuth },
}as const ),
}

export const authThunkCreator = (): AuthThunk<Promise<{ success: boolean } | undefined>> => async (dispatch:AuthDispatch) => {
  try{
    const response = await AuthAPI.me()
    if (response.data.resultCode === ResultCodeEnum.Success && response.data.data) {
      const { id, login, email } = response.data.data;
      dispatch(actionsAuth.handleAuth(id, login, email, true));
      return { success: true };
    }
  } catch(error){
    console.error("Error fetching profile:", error);
  }
};

export const loginThunkCreator = (email:string, password:string): AuthThunk<Promise<{ success: boolean; message?: string }>> =>
   async (dispatch) => {
  try {
    const response = await AuthAPI.loginAPI(email, password);

    if (response.data.resultCode === 0) {
      // const { id, login, email: userEmail } = response.data.data;
      // dispatch(actionsAuth.handleAuth(id, login, userEmail));
      dispatch(authThunkCreator());
      return { success: true };
    } else {
      return {
        success: false,
        message: response.data.messages[0] || "Login failed",
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Network error" };
  }
};
export const logoutThunkCreator = (): AuthThunk<Promise<{ success: boolean; message?: string }>> => async (dispatch) => {
  try {
    const response = await AuthAPI.logoutAPI();
    if (response.data.resultCode === ResultCodeEnum.Success) {
      dispatch(actionsAuth.handleAuth(null, null, null, false));
      return { success: true };
    } else {
      return {
        success: false,
        message: response.data.messages[0] || "Logout failed",
      };
    }
  } catch (error) {
    console.error("Logout error:", error);
    return { success: false, message: "Network error" };
  }
};

export default authReducer;
