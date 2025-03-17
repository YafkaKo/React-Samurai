import React from 'react'
import { Box, Stack, Typography, IconButton, Input } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { DispatchConst } from '../../../redux/store'
import { useSelector, useDispatch } from 'react-redux'


function MessagesActive(props) {
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
        dispatch({ type: DispatchConst.NEW_MESSAGE_TEXT,idOfUser: activeChat.id, newMessageText: event.target.value })
    }

    return (
        <Stack direction="column" sx={{ flexGrow: '1' }}>
            <Stack spacing={2} sx={{ flexGrow: '1' }}>
                {messages.map((message) => (
                    <Box
                        key={message.id}
                        sx={{
                            alignSelf: message.isMyMessage ? "flex-end" : "flex-start",
                            backgroundColor: "background.paper",
                            color: "text.primary",
                            padding: "8px 12px",
                            borderRadius: "12px",
                            maxWidth: "70%",
                        }}
                    >
                        <Typography sx={{ display: "block", textAlign: "left", fontWeight: "600", color: "primary.main" }}>
                            {message.isMyMessage ? "Me" : activeChat.nickname}
                        </Typography>
                        <Typography>{message.text}</Typography>
                    </Box>
                ))}
            </Stack>
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

    );
}

export default MessagesActive;