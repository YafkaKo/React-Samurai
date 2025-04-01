import UsersAPI from '../API/API';

 const DispatchConst = {
  SET_FOLLOW_USER: "SET_FOLLOW_USER",
  SET_USERS: "SET_USERS",
  SET_PAGINATION: "SET_PAGINATION",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_FETCHING: "SET_FETCHING",
  SET_FOLLOWING_PROGRESS: "SET_FOLLOWING_PROGRESS",
};


const initialState = {
  users: [
  ],
  usersPerPage: 6,
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
        usersPerPage: action.usersPerPage,
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

export const handlePagination = (usersPerPage,totalCount) =>
  ({ type: DispatchConst.SET_PAGINATION, usersPerPage,totalCount })

export const handleCurrentPage = (currentPage) =>
  ({ type: DispatchConst.SET_CURRENT_PAGE, currentPage })

export const handleFetching = (isFetching) =>
  ({ type: DispatchConst.SET_FETCHING, isFetching })

export const handleFollowingProgress = (isFetching,userId) =>
  ({ type: DispatchConst.SET_FOLLOWING_PROGRESS,isFetching, userId })


export const getUsersThunkCreator = (currentPage,usersPerPage)=> {
  return async(dispatch)=>{
  dispatch(handleFetching(true))
    const response = await UsersAPI.getUsersAPI({currentPage,usersPerPage})
      dispatch(handleFetching(false))
      dispatch(handleUsers(response.items));
      dispatch(handlePagination(usersPerPage, response.totalCount)); // Передаем общее количество пользователей

}
}

export const followUsersThunkCreator = (id, followed) => {
  return async (dispatch) => {
    dispatch(handleFollowingProgress(true, id));
    try {
      const apiMethod = followed ? UsersAPI.unFollowUsersAPI : UsersAPI.followUsersAPI;
      const response = await apiMethod(id)

      if (response.resultCode === 0) {
        dispatch(handleFollow(!followed, id));
      }
    } catch (error) {
      console.error('Error following user:', error);
    } finally {
      dispatch(handleFollowingProgress(false, id));
    }
  };
};

export default usersReducer