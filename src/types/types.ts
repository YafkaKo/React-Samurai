import { AuthStateType } from "../redux/auth-reducer";
import { MessageType } from "../redux/dialogs-reducer";

export type PostType = {
  id: number;
  user: string;
  avatar: string;
  text: string;
  likes: number;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: PhotoType;
  followed: boolean;
};

export type ContactType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};

export type PhotoType = {
  small: string | null;
  large: string | null;
};

export type ProfileType = {
  userId: string;
  aboutMe: string|undefined;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string;
  contacts?: ContactType;
  photos?: PhotoType;
  followed?: boolean;
};

export type UsersStateType = {
  users: UserType[];
  usersPerPage: number;
  currentPage: number;
  isFetching: boolean;
  FollowingIsProgress: number[];
  totalCount: number | null;
};

export type UsersPropsType = UsersStateType & {
  handleCurrentPage: (page: number) => ActionType;
};

export const DispatchConst = {
  SET_FOLLOW_USER: "SET_FOLLOW_USER",
  SET_USERS: "SET_USERS",
  SET_PAGINATION: "SET_PAGINATION",
  SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
  SET_FETCHING: "SET_FETCHING",
  SET_FOLLOWING_PROGRESS: "SET_FOLLOWING_PROGRESS",

  ADD_POST: "ADD_POST",
  SET_LIKE_COUNT: "SET_LIKE_COUNT",
  SET_PROFILE_FETCHING: "SET_PROFILE_FETCHING",
  SET_PROFILE: "SET_PROFILE",
  SET_STATUS: "SET_STATUS",
  PUT_PROFILE: "PUT_PROFILE",

  ADD_MESSAGE: "ADD_MESSAGE",

  SET_AUTH: "SET_AUTH",
  SET_USER_DATA: "SET_USER_DATA",

  SET_INIT: "SET_INIT",
} as const;

export type ActionType =
  | {
      type: typeof DispatchConst.SET_FOLLOW_USER;
      newFollow: boolean;
      idOfUser: number;
    }
  | { type: typeof DispatchConst.SET_USERS; newUsers: UserType[] }
  | {
      type: typeof DispatchConst.SET_PAGINATION;
      usersPerPage: number;
      totalCount: number;
    }
  | { type: typeof DispatchConst.SET_CURRENT_PAGE; currentPage: number }
  | { type: typeof DispatchConst.SET_FETCHING; isFetching: boolean }
  | {
      type: typeof DispatchConst.SET_FOLLOWING_PROGRESS;
      isFetching: boolean;
      userId: number;
    }
  | { type: typeof DispatchConst.ADD_POST; newPost: PostType }
  | {
      type: typeof DispatchConst.SET_LIKE_COUNT;
      idOfPost: number;
      newLikesCount: number;
    }
  | { type: typeof DispatchConst.SET_PROFILE_FETCHING; isFetching: boolean }
  | { type: typeof DispatchConst.SET_PROFILE; profile: ProfileType }
  | { type: typeof DispatchConst.SET_STATUS; status: string | null }
  | {
      type: typeof DispatchConst.ADD_MESSAGE;
      idOfUser: number;
      newMessage: MessageType;
    }
  | {
      type: typeof DispatchConst.SET_AUTH | typeof DispatchConst.SET_USER_DATA;
      data?: AuthStateType;
    }
  | { type: typeof DispatchConst.SET_INIT,initialized:boolean };
