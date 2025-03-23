import { DispatchConst } from './store'

const initialState = {
  posts: [],
  profile: null,
  isFetching: false

}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {

    case DispatchConst.SET_PROFILE:
      return {
        ...state,
        profile: action.profile
      }

    case DispatchConst.ADD_POST:
      return {
        posts: [...state.posts, action.newPost],
      }
    case DispatchConst.SET_LIKE_COUNT:

      return {
        posts: state.posts.map((post) =>
          post.id === action.idOfPost
            ? {
              ...post,
              likes: action.newLikesCount
            }
            : post
        )

      }
      case DispatchConst.SET_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      }

    default:
      return state
  }
}

export const handleProfile = (profile) =>
  ({ type: DispatchConst.SET_PROFILE, profile })
export const handlePost = (newPost) =>
  ({ type: DispatchConst.ADD_POST, newPost: newPost })

export const handleFetching = (isFetching) =>
  ({ type: DispatchConst.SET_FETCHING, isFetching })

export const handleLikesCount = (idOfPost, newLikesCount) =>
  ({ type: DispatchConst.SET_LIKE_COUNT, idOfPost: idOfPost, newLikesCount: newLikesCount })

export default profileReducer