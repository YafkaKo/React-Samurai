import { ProfileAPI } from "../API/API";
import { PostType,ProfileType } from "../types/types";
import { ActionType,DispatchConst } from "../types/types.ts";
import { ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "./redux-store.ts";


const initialState = {
  posts: [] as PostType[],
  profile: null as ProfileType|null,
  isFetching: false as boolean,
  status: null as string|null,
};

type InitialStateType = typeof initialState

export type ProfileDispatch = ThunkDispatch<RootState, unknown, ActionType>;

type ProfileThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  ActionType
>;

const profileReducer = (state = initialState, action: ActionType):InitialStateType => {
  switch (action.type) {
    case DispatchConst.SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case DispatchConst.SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case DispatchConst.ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.newPost],
      };
    case DispatchConst.SET_LIKE_COUNT:
      return {
        ...state,
        posts: state.posts.map((post:PostType) =>
          post.id === action.idOfPost
            ? {
                ...post,
                likes: action.newLikesCount,
              }
            : post
        ),
      };
    case DispatchConst.SET_PROFILE_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    default:
      return state;
  }
};

export const handleProfile = (profile:ProfileType):ActionType => ({
  type: DispatchConst.SET_PROFILE,
  profile,
});
export const handleStatus = (status:string|null):ActionType => ({
  type: DispatchConst.SET_STATUS,
  status,
});
export const handlePost = (newPost:PostType):ActionType => ({
  type: DispatchConst.ADD_POST,
  newPost,
});

export const handleFetching = (isFetching:boolean):ActionType => ({
  type: DispatchConst.SET_PROFILE_FETCHING,
  isFetching,
});
export const handleLikesCount = (idOfPost:number, newLikesCount:number):ActionType => ({
  type: DispatchConst.SET_LIKE_COUNT,
  idOfPost,
  newLikesCount,
});

export const getProfileThunkCreator = (id: string): ProfileThunk => {
  return async (dispatch: ProfileDispatch) => {
    if (id) {
      dispatch(handleFetching(true)); // Устанавливаем состояние загрузки
      try {
        const response = await ProfileAPI.getProfileAPI(id);
        dispatch(handleProfile(response.data)); // Передаем данные профиля в Redux
        dispatch(handleFetching(false)); // Убираем состояние загрузки
      } catch (error) {
        console.error("Error fetching profile:", error);
        dispatch(handleFetching(false)); // Убираем состояние загрузки в случае ошибки
      }
    }
  };
};

export const getProfileStatusThunkCreator = (id: string): ProfileThunk => {
  return async (dispatch: ProfileDispatch) => {
    if (id) {
      dispatch(handleFetching(true)); // Устанавливаем состояние загрузки
      const response = await ProfileAPI.getStatusAPI(id);
      try {
        dispatch(handleStatus(response.data)); // Передаем данные профиля в Redux
        dispatch(handleFetching(false)); // Убираем состояние загрузки
      } catch (error) {
        console.error("Error fetching profile:", error);
        dispatch(handleFetching(false)); // Убираем состояние загрузки в случае ошибки
      }
    }
  };
};

export const setProfileStatusThunkCreator = (id: string): ProfileThunk => {
  return async (dispatch: ProfileDispatch) => {
    const response = await ProfileAPI.setStatusAPI(id);
    try {
      dispatch(handleStatus(response.data)); // Передаем данные профиля в Redux
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
};

export const putProfileThunkCreator = (profile:ProfileType): ProfileThunk =>
  async (dispatch: ProfileDispatch) => {
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
