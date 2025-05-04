
import {  ActionTypesUsers, InitialStateType } from "../redux/users-reducer";

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

export type UsersPropsType = InitialStateType & {
  handleCurrentPage: (page: number) => ActionTypesUsers;
  handleFilter: (term?:string,isFriend?:boolean) => ActionTypesUsers
};