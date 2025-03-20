import { DispatchConst } from './store'

const initialState = {
  posts: [
    {
      id: 1,
      user: 'Алексей',
      avatar: 'A',
      text: 'Отличный пост!',
      likes: 10,
    },
    {
      id: 2,
      user: 'Мария',
      avatar: 'M',
      text: 'Спасибо за информацию!',
      likes: 5,
    },
    {
      id: 3,
      user: 'Иван',
      avatar: 'I',
      text: 'Интересно, жду продолжения.',
      likes: 3,
    },
  ]
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {

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

    default:
      return state
  }
}

export const addPostActionCreator = (newPost) =>
  ({ type: DispatchConst.ADD_POST, newPost: newPost })

export const setLikesCountActionCreator = (idOfPost, newLikesCount) =>
  ({ type: DispatchConst.SET_LIKE_COUNT, idOfPost: idOfPost, newLikesCount: newLikesCount })

export default profileReducer