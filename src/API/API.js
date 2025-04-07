import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: { "API-KEY": "f3d2ecb6-57f4-4c9d-bbec-e9bd92eacaba" },
});

 const UsersAPI = {
  getUsersAPI({ currentPage, usersPerPage }){
    return instance
      .get(`users?page=${currentPage}&count=${usersPerPage}`)
      .then((response) => response.data);
  },

  followUsersAPI (userId){
    return instance
      .post(`follow/${userId}`)
      .then((response) => response.data);
  },
  unFollowUsersAPI (userId){
    return instance
      .delete(`follow/${userId}`) // Changed from POST to DELETE
      .then((response) => response.data);
  },

  getStatusAPI(id){
    return instance
      .get(`profile/status/${id}`)
  }

}
 export const ProfileAPI = {
  getProfileAPI(id){
    return instance
      .get(`profile/${id}`)

  },
  getStatusAPI(id){
    return instance
      .get(`profile/status/${id}`)
  },
  setStatusAPI(newStatus){
    return instance
      .put(`profile/status`,{status: newStatus})
  },
  putProfileAPI(profile){
    return instance
      .put(`profile`,profile)
  }

}

export const AuthAPI = {
  me: ()=>{
    return instance.get(`auth/me`)
  },
  loginAPI: (email,password)=>{
    return instance.post(`auth/login`,{email,password})
  },
  logoutAPI: ()=>{
    return instance.delete(`auth/login`)
  }
}

export default UsersAPI