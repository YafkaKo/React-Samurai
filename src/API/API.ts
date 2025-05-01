import axios from "axios";
import { ProfileType, UserType } from "../types/types";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: { "API-KEY": "f3d2ecb6-57f4-4c9d-bbec-e9bd92eacaba" },
});

export enum ResultCodeEnum {
  Success = 0,
  Error = 1
}

type UsersQueryParams = {
  currentPage: number;
  usersPerPage: number;
};

type AuthMeType = {
  data?: {
    id: number;
    email: string;
    login: string;
  },
  resultCode: ResultCodeEnum,
  messages: Array<string>
};

export type ResultType = {
  resultCode: ResultCodeEnum,
  messages: Array<string>,
  data: object
}

type GetUsersAPIType = {
  items: UserType[],
  totalCount?: number,
  error?: string
}

const UsersAPI = {
  async getUsersAPI({ currentPage, usersPerPage }: UsersQueryParams) {
    return instance
      .get<GetUsersAPIType>(`users?page=${currentPage}&count=${usersPerPage}`)
      .then((response) => response.data);
  },

  async followUsersAPI(userId: number) {
    return instance.post<ResultType>(`follow/${userId}`).then((response) => response.data);
  },
  async unFollowUsersAPI(userId: number) {
    return instance
      .delete<ResultType>(`foll ow/${userId}`) // Changed from POST to DELETE
      .then((response) => response.data);
  },
};
export const ProfileAPI = {
  async getProfileAPI(id: string) {
    return instance.get<any>(`profile/${id}`);
  },
  async getStatusAPI(id: string) {
    return instance.get<any>(`profile/status/${id}`);
  },
  async setStatusAPI(newStatus: string) {
    return instance.put<any>(`profile/status`, { status: newStatus });
  },
  async putProfileAPI(profile: ProfileType) {
    return instance.put<any>(`profile`, profile);
  },
};

export const AuthAPI = {
  me: () => {
    return instance.get<AuthMeType>(`auth/me`);
  },
  loginAPI: (email: string, password: string) => {
    return instance.post<ResultType>(`auth/login`, { email, password });
  },
  logoutAPI: () => {
    return instance.delete<ResultType>(`auth/login`);
  },
};

export default UsersAPI;
