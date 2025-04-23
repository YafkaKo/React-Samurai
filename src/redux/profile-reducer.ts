import { ProfileAPI } from "../API/API.ts";
import { PostType, ProfileType } from "../types/types";
import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { InferActionsTypes, RootState } from "./redux-store.ts";

const initialState = {
  posts: [] as PostType[],
  profile: null as ProfileType | null,
  isFetching: false as boolean,
  status: null as string | null,
};

type InitialStateType = typeof initialState;

type ActionTypesProfile = InferActionsTypes<typeof actionsProfile>;

export type ProfileDispatch = ThunkDispatch<RootState, unknown, ActionTypesProfile>;

type ProfileThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionTypesProfile
>;

const profileReducer = (
  state = initialState,
  action: ActionTypesProfile
): InitialStateType => {
  switch (action.type) {
    case "SET_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "SET_STATUS":
      return {
        ...state,
        status: action.status,
      };

    case "ADD_POST":
      return {
        ...state,
        posts: [...state.posts, action.newPost],
      };
    case "SET_LIKE_COUNT":
      return {
        ...state,
        posts: state.posts.map((post: PostType) =>
          post.id === action.idOfPost
            ? {
                ...post,
                likes: action.newLikesCount,
              }
            : post
        ),
      };
    case "SET_PROFILE_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };

    default:
      return state;
  }
};

export const actionsProfile = {
  handleProfile: (profile: ProfileType) => ({
    type: "SET_PROFILE",
    profile,
  } as const),
  handleStatus: (status: string | null) => ({
    type: "SET_STATUS",
    status,
  } as const),
  handlePost: (newPost: PostType) => ({
    type: "ADD_POST",
    newPost,
  } as const),

  handleFetching: (isFetching: boolean) => ({
    type: "SET_PROFILE_FETCHING",
    isFetching,
  } as const),
  handleLikesCount: (idOfPost: number, newLikesCount: number) => ({
    type: "SET_LIKE_COUNT",
    idOfPost,
    newLikesCount,
  } as const),
};

export const getProfileThunkCreator = (id: string): ProfileThunk => {
  return async (dispatch) => {
    if (id) {
      dispatch(actionsProfile.handleFetching(true)); // Устанавливаем состояние загрузки
      try {
        const response = await ProfileAPI.getProfileAPI(id);
        dispatch(actionsProfile.handleProfile(response.data)); // Передаем данные профиля в Redux
        dispatch(actionsProfile.handleFetching(false)); // Убираем состояние загрузки
      } catch (error) {
        console.error("Error fetching profile:", error);
        dispatch(actionsProfile.handleFetching(false)); // Убираем состояние загрузки в случае ошибки
      }
    }
  };
};

export const getProfileStatusThunkCreator = (id: string): ProfileThunk => {
  return async (dispatch) => {
    if (id) {
      dispatch(actionsProfile.handleFetching(true)); // Устанавливаем состояние загрузки
      const response = await ProfileAPI.getStatusAPI(id);
      try {
        dispatch(actionsProfile.handleStatus(response.data)); // Передаем данные профиля в Redux
        dispatch(actionsProfile.handleFetching(false)); // Убираем состояние загрузки
      } catch (error) {
        console.error("Error fetching profile:", error);
        dispatch(actionsProfile.handleFetching(false)); // Убираем состояние загрузки в случае ошибки
      }
    }
  };
};

export const setProfileStatusThunkCreator = (id: string): ProfileThunk => {
  return async (dispatch) => {
    const response = await ProfileAPI.setStatusAPI(id);
    try {
      dispatch(actionsProfile.handleStatus(response.data)); // Передаем данные профиля в Redux
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
};

export const putProfileThunkCreator =
  (profile: ProfileType): ProfileThunk =>
  async (dispatch) => {
    const response = await ProfileAPI.putProfileAPI(profile);
    if (response.data.resultCode === 1 || response.data.data.length === 0) {
      return;
    }
    try {
      dispatch(getProfileThunkCreator(profile.userId)); // Передаем данные профиля в Redux
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

export default profileReducer;
