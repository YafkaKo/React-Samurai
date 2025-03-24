import { DispatchConst } from './store'

const initialState = {
  users: [
  ],
  paginationSize: 6,
  currentPage: 1,
  isFetching: false,
  FollowingIsProgress: []
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
              followed: action.newFollow
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

    case DispatchConst.SET_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }
    case DispatchConst.SET_FOLLOWING_PROGRESS:

      return {
        ...state,
        FollowingIsProgress: action.isFetching ?
[...state.FollowingIsProgress, action.userId]
        : state.FollowingIsProgress.filter(id=> id !== action.userId)
      }

    default:
      return state
  }
}

export const handleFollow = (newFollow, idOfUser) =>
  ({ type: DispatchConst.SET_FOLLOW_USER, newFollow, idOfUser })

export const handleUsers = (newState) =>
  ({ type: DispatchConst.SET_USERS, newState })

export const handlePagination = (paginationSize,totalCount) =>
  ({ type: DispatchConst.SET_PAGINATION, paginationSize,totalCount })

export const handleCurrentPage = (currentPage) =>
  ({ type: DispatchConst.SET_CURRENT_PAGE, currentPage })

export const handleFetching = (isFetching) =>
  ({ type: DispatchConst.SET_FETCHING, isFetching })

export const handleFollowingProgress = (isFetching,userId) =>
  ({ type: DispatchConst.SET_FOLLOWING_PROGRESS,isFetching, userId })


export default usersReducer