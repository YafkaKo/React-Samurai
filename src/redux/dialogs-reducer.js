import { DispatchConst } from './State'

const dialogsReducer = (state, action) => {

  if (action.type === DispatchConst.ADD_MESSAGE) {
    state.chats[action.idOfUser].messages.push(action.newMessage)
    console.log(DispatchConst.ADD_MESSAGE)
  }
  if (action.type === DispatchConst.NEW_MESSAGE_TEXT) {
    state.chats[action.idOfUser].newMessageText = action.newText
    console.log(state.chats[action.idOfUser].newMessageText)
    console.log(DispatchConst.NEW_MESSAGE_TEXT)
  }

  return state
}

export default dialogsReducer