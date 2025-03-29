import { AuthAPI } from "../API/API";
import { DispatchConst } from "./store";

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case DispatchConst.SET_USER_DATA:
      return {
        ...state,
        ...action.data,
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

export const handleAuth = (id, login, email, isAuth) => ({
  type: DispatchConst.SET_USER_DATA,
  data: { id, email, login, isAuth },
});
// export const handleLogout = () => ({ type: DispatchConst.SET_AUTH });
export const authThunkCreator = () => {
  return (dispatch) => {
    AuthAPI.me()
      .then((response) => {
        if (response.data.resultCode === 0) {
          const { id, login, email } = response.data.data;
          dispatch(handleAuth(id, login, email, true));
        }
      })
      .catch((error) => {
        console.error("Error fetching profile:", error); // Убираем состояние загрузки в случае ошибки
      });
  };
};
export const loginThunkCreator = (email, password) => async (dispatch) => {
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
  console.log("dispatch");
  try {
    const response = await AuthAPI.logoutAPI();
    if (response.data.resultCode === 0) {
      dispatch(handleAuth(null, null, null, false));
      // dispatch(handleLogout());
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
