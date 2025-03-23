import { DispatchConst } from './store'

const initialState = {
  users: [
  ],
  paginationSize: 6,
  currentPage: 1

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
      return {
        ...state,
        users: [...action.newState]
      }

    case DispatchConst.SET_PAGINATION:
      return {
        ...state,
        paginationSize: action.paginationSize,
        totalCount: action.totalCount
      }

    case DispatchConst.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      }

    default:
      return state
  }
}

export const setFollowActionCreator = (newFollow, idOfUser) =>
  ({ type: DispatchConst.SET_FOLLOW_USER, newFollow, idOfUser })

export const setUsersAC = (newState) =>
  ({ type: DispatchConst.SET_USERS, newState })

export const setPagintationAC = (paginationSize,totalCount) =>
  ({ type: DispatchConst.SET_PAGINATION, paginationSize,totalCount })

export const setCurrentPage = (currentPage) =>
  ({ type: DispatchConst.SET_CURRENT_PAGE, currentPage })


export default usersReducer