import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AuthAPI } from "../API/API";
import { RootState } from "./redux-store";
import { ActionType,DispatchConst } from "../types/types.ts";


type initialStateType = {
  id: null | number,
  email: null | string,
  login: null | string,
  isAuth: boolean,
}

export type AuthStateType = initialStateType

export type AuthDispatch = ThunkDispatch<RootState, unknown, ActionType>;

type AuthThunk<ReturnType = void> =ThunkAction<ReturnType, RootState, unknown, ActionType>;


const initialState: initialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};



const authReducer = (state:initialStateType = initialState, action:ActionType):initialStateType => {
  switch (action.type) {
    case DispatchConst.SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: action.data?.isAuth ?? true
      };
    case DispatchConst.SET_AUTH:
      return {
        ...state,
        isAuth: false,
      };

    default:
      return state;
  }
};

export const handleAuth = (id:number|null, login:string|null, email:string|null, isAuth:boolean):ActionType => ({
  type: DispatchConst.SET_USER_DATA,
  data: { id, email, login, isAuth },
});

export const authThunkCreator = (): AuthThunk<Promise<{ success: boolean } | undefined>> => async (dispatch:AuthDispatch) => {
  try{
    const response = await AuthAPI.me()
    if (response.data.resultCode === 0) {
      const { id, login, email } = response.data.data;
      dispatch(handleAuth(id, login, email, true));
      return { success: true };
    }
  } catch(error){
    console.error("Error fetching profile:", error);
  }
};

export const loginThunkCreator = (email:string, password:string): AuthThunk<Promise<{ success: boolean; message?: string }>> => async (dispatch:AuthDispatch) => {
  try {
    const response = await AuthAPI.loginAPI(email, password);

    if (response.data.resultCode === 0) {
      // const { id, login, email: userEmail } = response.data.data;
      // dispatch(handleAuth(id, login, userEmail));
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
export const logoutThunkCreator = (): AuthThunk<Promise<{ success: boolean; message?: string }>> => async (dispatch:AuthDispatch) => {
  try {
    const response = await AuthAPI.logoutAPI();
    if (response.data.resultCode === 0) {
      dispatch(handleAuth(null, null, null, false));
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
