import { DispatchConst } from './State'

const profileReducer = (state, action) => {

  if (action.type === DispatchConst.ADD_POST) {
    state.posts.push(action.newPost)
    console.log(DispatchConst.ADD_POST)
  }

  return state
}

export default profileReducer