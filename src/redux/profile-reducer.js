import { ProfileAPI } from "../API/API";
import { DispatchConst } from "./store";

const initialState = {
  posts: [],
  profile: null,
  isFetching: false,
  status: null,
};

const profileReducer = (state = initialState, action) => {
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
        posts: state.posts.map((post) =>
          post.id === action.idOfPost
            ? {
                ...post,
                likes: action.newLikesCount,
              }
            : post
        ),
      };
    case DispatchConst.SET_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    default:
      return state;
  }
};

export const handleProfile = (profile) => ({
  type: DispatchConst.SET_PROFILE,
  profile,
});
export const handleStatus = (status) => ({
  type: DispatchConst.SET_STATUS,
  status,
});
export const handlePost = (newPost) => ({
  type: DispatchConst.ADD_POST,
  newPost: newPost,
});

export const handleFetching = (isFetching) => ({
  type: DispatchConst.SET_FETCHING,
  isFetching,
});

export const handleLikesCount = (idOfPost, newLikesCount) => ({
  type: DispatchConst.SET_LIKE_COUNT,
  idOfPost: idOfPost,
  newLikesCount: newLikesCount,
});

export const getProfileThunkCreator = (id) => {
  return (dispatch) => {
    if(id) {
    dispatch(handleFetching(true)); // Устанавливаем состояние загрузки
    ProfileAPI.getProfileAPI(id)
      .then((response) => {
        dispatch(handleProfile(response.data)); // Передаем данные профиля в Redux
        dispatch(handleFetching(false)); // Убираем состояние загрузки
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        dispatch(handleFetching(false)); // Убираем состояние загрузки в случае ошибки
      });
    }
  };

};
export const getProfileStatusThunkCreator = (id) => {
  return (dispatch) => {
    if(id){
    dispatch(handleFetching(true)); // Устанавливаем состояние загрузки
    ProfileAPI.getStatusAPI(id)
      .then((response) => {
        dispatch(handleStatus(response.data)); // Передаем данные профиля в Redux
        dispatch(handleFetching(false)); // Убираем состояние загрузки
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        dispatch(handleFetching(false)); // Убираем состояние загрузки в случае ошибки
      });
    }
  };
};

export const setProfileStatusThunkCreator = (id) => {
  return (dispatch) => {
    ProfileAPI.setStatusAPI(id)
      .then((response) => {
        if (response.data.resultCode === 0) console.log("setStatus"); // Передаем данные профиля в Redux
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  };
};

export default profileReducer;
