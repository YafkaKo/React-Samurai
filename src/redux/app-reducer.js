import { authThunkCreator } from "./auth-reducer";

 const DispatchConst = {
  SET_INIT: "SET_INIT"
};


const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
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

export const handleInit = (initialized) => ({
  type: DispatchConst.SET_INIT,
  initialized,
});

export const initialize = ()=> async (dispatch)=>{
    await dispatch(authThunkCreator());
   dispatch(handleInit(true))
}

export default appReducer;
