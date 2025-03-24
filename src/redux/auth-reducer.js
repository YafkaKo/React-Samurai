import { DispatchConst } from './store'

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case DispatchConst.SET_USER_DATA:
      return {
        ...state,
        ...action.data,
        isAuth: true
      }


    default:
      return state
  }
}

export const handleAuth = (id,login,email) =>({ type: DispatchConst.SET_USER_DATA, data:{id,email,login },})


export default authReducer