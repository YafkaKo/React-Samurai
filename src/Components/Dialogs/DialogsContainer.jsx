import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Dialogs from './Dialogs'


export default function DialogsContainer() {
  const chats = useSelector(state => state.dialogsPage.chats)

  const navigate = useNavigate()
  const { chatId } = useParams()
  const [chatUser, setChatUser] = React.useState(chatId ? parseInt(chatId) : 0)

  let activeChat = useRef(null)

  if (typeof chatUser === 'number') {
    activeChat = chats.find((chat) => chat.id === chatUser)
  }

  const handleChange = (event, chatUser) => {
    ++chatUser
    setChatUser(chatUser)
    navigate(`/dialogs/${chatUser}`)
  }

  return (
    <Dialogs chatUser={chatUser} handleChange={handleChange} chats={chats} activeChat={activeChat} />
  )
};