// import React from 'react'
import MessagesActive from './MessagesActive'
import { connect } from 'react-redux'
import { addMessageActionCreator,
    //  newMessageTextActionCreator
    } from '../../../redux/dialogs-reducer'


const mapStateToProps = (state, props) => {
    const { activeChat, count } = props

    return {
        activeChat: activeChat,
        messages: state.dialogsPage.chats[count].messages,
        // newMessageText: state.dialogsPage.chats[count].newMessageText
    }
}



const mapDispatchesToProps = (dispatch) => {
    return {
        handleMessage: (idOfUser, newMessage) => {
            dispatch(addMessageActionCreator(newMessage, idOfUser))
        },
        // handleInput: (idOfUser, newMessageText) => {
        //     dispatch(newMessageTextActionCreator(newMessageText, idOfUser))
        // }
    }
}


const MessagesActiveContainer = connect(mapStateToProps, mapDispatchesToProps)(MessagesActive)

export default MessagesActiveContainer;