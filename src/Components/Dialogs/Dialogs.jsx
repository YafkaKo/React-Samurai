import React, { useEffect, useRef } from 'react'
import { Avatar, Box, Divider, IconButton, Input, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Messages from './Messages/Messages'
import SendIcon from '@mui/icons-material/Send'


export default function Dialogs(props) {
  const { dispatch } = props
  const { chats } = props.Dialogs

  const navigate = useNavigate()
  const { chatId } = useParams()
  const [chatUser, setChatUser] = React.useState(chatId ? parseInt(chatId) : false)
  const [messages, setMessages] = React.useState([])
  const [inputValue, setInputValue] = React.useState('')
  const textareaRef = useRef(null)
  let activeChat = useRef(null)

  if (typeof chatUser === 'number') {
    activeChat = chats.find((chat) => chat.id === chatUser)
  }

  useEffect(() => {
    if (activeChat) {
      setMessages(activeChat.messages)
    }
  }, [activeChat])

  useEffect(() => {
    if (textareaRef.current && activeChat) {
      textareaRef.current.focus()
    }
  }, [activeChat])

  const handleChange = (event, chatUser) => {
    ++chatUser
    setChatUser(chatUser)
    navigate(`/dialogs/${chatUser}`)
  }

  function handleMessage() {
    let newMessage = {
      id: messages.length + 1,
      text: inputValue,
      timestamp: new Date().toISOString(),
      isMyMessage: true
    }
    dispatch({ type: 'ADD-MESSAGE', idOfUser: activeChat.id, newMessage: newMessage })
    setMessages([...messages, newMessage])
    setInputValue('')
  }

  function handleInput(event) {
    setInputValue(event.target.value)
  }

  return (
    <Box sx={{
      width: '100%',
      padding: '15px',
      // display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography sx={{ fontWeight: 'bold' }} variant="h4" component="h4">Dialogs</Typography>
      <Stack direction="row" sx={{ flexGrow: '1' }} divider={<Divider orientation="vertical" flexItem
        sx={{
          ml: 0,
          width: '2px',
          backgroundColor: 'primary.main'
        }} />}>
        <Tabs value={chatUser - 1} onChange={handleChange} orientation="vertical" scrollButtons="auto"
          aria-label="basic tabs example">
          {chats.map((chat) => (
            <Tab key={chat.id}
              label={<><Avatar>{chat.avatar = chat.nickname.slice(0, 1).toUpperCase()}</Avatar>{chat.nickname}</>}
              sx={{
                fontSize: 24,
                color: 'text.primary',
                pl: 0,
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                justifyContent: 'space-between'

              }} />
          ))}
        </Tabs>
        <Box sx={{ display: 'flex', flexGrow: 1, padding: '10px' }}>
          {activeChat ? (
            <Stack direction="column" sx={{ flexGrow: '1' }}>
              <Messages messages={messages} nickname={activeChat.nickname} />
              <Stack direction="row" spacing={2}>
                <Input onChange={handleInput} multiline placeholder="Send a message..." fullWidth value={inputValue} />
                <IconButton onClick={() => handleMessage()} sx={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF'
                }}><SendIcon /></IconButton>
              </Stack>
            </Stack>
          ) : (
            <Typography variant="h4" sx={{ textAlign: 'center' }}>Select a chat to start messaging</Typography>
          )}
        </Box>
      </Stack>
    </Box>
  )
};