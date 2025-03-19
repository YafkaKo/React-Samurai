import React from 'react'
import MessagesActive from './MessagesActive'
import { DispatchConst } from '../../../redux/store'
import { useSelector, useDispatch } from 'react-redux'


function MessagesActiveContainer(props) {
    const { activeChat } = props
    const messages = useSelector(state => state.dialogsPage.chats[activeChat.id - 1].messages)
    const inputValue = useSelector(state => state.dialogsPage.chats[activeChat.id - 1].newMessageText)
    const dispatch = useDispatch()


    function handleMessage() {
        let newMessage = {
            id: messages.length + 1,
            text: inputValue,
            timestamp: new Date().toISOString(),
            isMyMessage: true
        }
        dispatch({ type: DispatchConst.ADD_MESSAGE, idOfUser: activeChat.id, newMessage: newMessage })
    }

    function handleInput(event) {
        dispatch({ type: DispatchConst.NEW_MESSAGE_TEXT, idOfUser: activeChat.id, newMessageText: event.target.value })
    }

    return (
        <MessagesActive messages={messages} inputValue={inputValue} handleMessage={handleMessage} handleInput={handleInput} activeChat={activeChat} />

    );
}

export default MessagesActiveContainer;