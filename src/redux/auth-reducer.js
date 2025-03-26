import { AuthAPI } from '../API/API';
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
export const authThunkCreator = () =>{
  return (dispatch)=>{
    AuthAPI.me()
        .then(response=>{
            if(response.data.resultCode===0){
                const {id,login,email} =  response.data.data
                dispatch(handleAuth(id,login,email))
            }
        })
        .catch(error => {
                console.error('Error fetching profile:', error); // Убираем состояние загрузки в случае ошибки
              });
  }
}


export default authReducer