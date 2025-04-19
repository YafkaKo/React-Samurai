import UsersAPI from "../API/API";
import { UserType } from "../types/types";
import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "./redux-store";
import { ActionType,DispatchConst } from "../types/types.ts";

type InitialStateType = {
  users: UserType[];
  usersPerPage: number;
  currentPage: number;
  isFetching: boolean;
  FollowingIsProgress: number[];
  totalCount: number | null;
};


export type UsersDispatch = ThunkDispatch<RootState, unknown, ActionType>;

type UsersThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionType
>;

const initialState: InitialStateType = {
  users: [],
  usersPerPage: 6,
  currentPage: 1,
  isFetching: false,
  FollowingIsProgress: [],
  totalCount: null,
};

const usersReducer = (
  state = initialState,
  action: ActionType
): InitialStateType => {
  switch (action.type) {
    case DispatchConst.SET_FOLLOW_USER:
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

    case DispatchConst.SET_USERS:
      return {
        ...state,
        users: [...action.newUsers],
      };

    case DispatchConst.SET_PAGINATION:
      return {
        ...state,
        usersPerPage: action.usersPerPage,
        totalCount: action.totalCount,
      };

    case DispatchConst.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case DispatchConst.SET_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case DispatchConst.SET_FOLLOWING_PROGRESS:
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

export const handleFollow = (
  newFollow: boolean,
  idOfUser: number
): ActionType => ({ type: DispatchConst.SET_FOLLOW_USER, newFollow, idOfUser });

export const handleUsers = (newUsers: UserType[]): ActionType => ({
  type: DispatchConst.SET_USERS,
  newUsers,
});

export const handlePagination = (
  usersPerPage: number,
  totalCount: number
): ActionType => ({
  type: DispatchConst.SET_PAGINATION,
  usersPerPage,
  totalCount,
});

export const handleCurrentPage = (currentPage: number): ActionType => ({
  type: DispatchConst.SET_CURRENT_PAGE,
  currentPage,
});

export const handleFetching = (isFetching: boolean): ActionType => ({
  type: DispatchConst.SET_FETCHING,
  isFetching,
});

export const handleFollowingProgress = (
  isFetching: boolean,
  userId: number
): ActionType => ({
  type: DispatchConst.SET_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});

export const getUsersThunkCreator = (
  currentPage: number,
  usersPerPage: number
): UsersThunk => {
  return async (dispatch: UsersDispatch) => {
    dispatch(handleFetching(true));
    const response = await UsersAPI.getUsersAPI({ currentPage, usersPerPage });
    dispatch(handleFetching(false));
    dispatch(handleUsers(response.items));
    dispatch(handlePagination(usersPerPage, response.totalCount)); // Передаем общее количество пользователей
  };
};

export const followUsersThunkCreator = (id: number, followed: boolean) => {
  return async (dispatch: UsersDispatch) => {
    dispatch(handleFollowingProgress(true, id));
    try {
      const apiMethod = followed
        ? UsersAPI.unFollowUsersAPI
        : UsersAPI.followUsersAPI;
      const response = await apiMethod(id);

      if (response.resultCode === 0) {
        dispatch(handleFollow(!followed, id));
      }
    } catch (error) {
      console.error("Error following user:", error);
    } finally {
      dispatch(handleFollowingProgress(false, id));
    }
  };
};

export default usersReducer;
