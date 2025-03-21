import { DispatchConst } from './store'

const initialState = {
  users: [
  ],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case DispatchConst.SET_FOLLOW_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.idOfUser
            ? {
              ...user,
              follow: action.newFollow
            }
            : user
        )
      }

    case DispatchConst.SET_USERS:
      console.log(action.newState)
      return {
        ...state,
        users: [...action.newState]
      }

    default:
      return state
  }
}

export const setFollowActionCreator = (newFollow, idOfUser) =>
  ({ type: DispatchConst.SET_FOLLOW_USER, newFollow, idOfUser })

export const setUsersAC = (newState) =>
  ({ type: DispatchConst.SET_USERS, newState })


export default usersReducer