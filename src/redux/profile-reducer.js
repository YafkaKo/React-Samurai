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

    default:
      return state
  }
}

export default profileReducer