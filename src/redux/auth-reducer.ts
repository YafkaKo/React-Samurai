import { AuthAPI } from "../API/API";

type DispatchConstType = {
  SET_USER_DATA: string,
  SET_AUTH: string,
}

const DispatchConst: DispatchConstType = {
  SET_AUTH: "SET_AUTH",
  SET_USER_DATA: "SET_USER_DATA",
};

type initialStateType = {
  id: null | number,
  email: null | string,
  login: null | string,
  isAuth: boolean,
}

const initialState: initialStateType = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

type actionType = {
  type: string,
  data?: initialStateType,
}

const authReducer = (state:initialStateType = initialState, action:actionType) => {
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

export const handleAuth = (id:number|null, login:string|null, email:string|null, isAuth:boolean|null) => ({
  type: DispatchConst.SET_USER_DATA,
  data: { id, email, login, isAuth },
});

export const authThunkCreator = () => async (dispatch) => {
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

export const loginThunkCreator = (email:string, password:string) => async (dispatch) => {
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
export const logoutThunkCreator = () => async (dispatch) => {
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
