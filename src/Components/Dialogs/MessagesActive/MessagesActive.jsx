import React from 'react'
import { Box, Stack, Typography, IconButton, Input } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'


function MessagesActive(props) {
    const { messages, newMessageText, handleMessage, handleInput, activeChat } = props

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
                <Input onChange={(e) => {
                    handleInput(activeChat.id, e.target.value)
                }
                }
                    multiline placeholder="Send a message..." fullWidth value={newMessageText} />
                <IconButton onClick={() => {
                    let newMessage = {
                        id: messages.length + 1,
                        text: newMessageText,
                        timestamp: new Date().toISOString(),
                        isMyMessage: true
                    }
                    handleMessage(activeChat.id, newMessage)
                    // SetInputValue('')
                    handleInput(activeChat.id, '')
                }
                } sx={{
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