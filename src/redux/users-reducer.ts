import UsersAPI from "../API/API";
import { UserType } from "../types/types";
import {
  InferActionsTypes,
  ThunkActionType,
  ThunkDispatchType,
} from "./redux-store";

const initialState = {
  users: [] as UserType[],
  usersPerPage: 6 as number,
  currentPage: 1 as number,
  isFetching: false as boolean,
  FollowingIsProgress: [] as number[],
  totalCount: null as number | null,
};

const usersReducer = (
  state = initialState,
  action: ActionTypesUsers
): InitialStateType => {
  switch (action.type) {
    case "SET_FOLLOW_USER":
      return {
        ...state,
        users: state.users.map((user: UserType) =>
          user.id === action.idOfUser
            ? {
                ...user,
                followed: action.newFollow,
              }
            : user
        ),
      };

    case "SET_USERS":
      return {
        ...state,
        users: [...action.newUsers],
      };

    case "SET_PAGINATION":
      return {
        ...state,
        usersPerPage: action.usersPerPage,
        totalCount: action.totalCount,
      };

    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case "SET_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "SET_FOLLOWING_PROGRESS":
      return {
        ...state,
        FollowingIsProgress: action.isFetching
          ? [...state.FollowingIsProgress, action.userId]
          : state.FollowingIsProgress.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

export const actionsUsers = {
  handleFollow: (newFollow: boolean, idOfUser: number) =>
    ({ type: "SET_FOLLOW_USER", newFollow, idOfUser } as const),
  handleUsers: (newUsers: UserType[]) =>
    ({
      type: "SET_USERS",
      newUsers,
    } as const),
  handlePagination: (usersPerPage: number, totalCount: number) =>
    ({
      type: "SET_PAGINATION",
      usersPerPage,
      totalCount,
    } as const),

  handleCurrentPage: (currentPage: number) =>
    ({
      type: "SET_CURRENT_PAGE",
      currentPage,
    } as const),
  handleFetching: (isFetching: boolean) =>
    ({
      type: "SET_FETCHING",
      isFetching,
    } as const),
  handleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "SET_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

export const getUsersThunkCreator = (
  currentPage: number,
  usersPerPage: number
): UsersThunk => {
  return async (dispatch) => {
    dispatch(actionsUsers.handleFetching(true));
    const response = await UsersAPI.getUsersAPI({ currentPage, usersPerPage });
    dispatch(actionsUsers.handleFetching(false));
    dispatch(actionsUsers.handleUsers(response.items));
    if (response.totalCount) {
      dispatch(
        actionsUsers.handlePagination(usersPerPage, response.totalCount)
      ); // Передаем общее количество пользователей
    }
  };
};

export const followUsersThunkCreator = (
  id: number,
  followed: boolean
): UsersThunk => {
  return async (dispatch) => {
    dispatch(actionsUsers.handleFollowingProgress(true, id));
    try {
      const apiMethod = followed
        ? UsersAPI.unFollowUsersAPI
        : UsersAPI.followUsersAPI;
      const response = await apiMethod(id);

      if (response.resultCode === 0) {
        dispatch(actionsUsers.handleFollow(!followed, id));
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
    dispatch(actionsUsers.handleFollowingProgress(false, id));

  };
};

export default usersReducer;

export type ActionTypesUsers = InferActionsTypes<typeof actionsUsers>;

export type UsersDispatch = ThunkDispatchType<ActionTypesUsers>;

type UsersThunk = ThunkActionType<ActionTypesUsers>;

export type InitialStateType = typeof initialState;
