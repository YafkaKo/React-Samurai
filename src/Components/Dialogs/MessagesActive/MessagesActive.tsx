import React, { FC, FormEvent, KeyboardEvent, useState } from 'react'
import { Box, Stack, Typography, IconButton, Input } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import {ActionTypesDialogs, ChatType, MessageType} from '../../../redux/dialogs-reducer'



interface PropsType {
    messages: MessageType[];
    activeChat: ChatType;
    handleMessage: (idOfUser:number, newMessage:MessageType) => ActionTypesDialogs,
}

const MessagesActive: FC<PropsType> = (props) => {
    const { messages, handleMessage, activeChat,
         } = props

    const [newMessageText,setNewMessageText] = useState<string>('')
    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage();
    };

    const sendMessage = () => {
        if (!newMessageText.trim()) return;

        const newMessage = {
            id: Date.now(), // Лучше использовать timestamp для ID
            text: newMessageText,
            timestamp: new Date().toISOString(),
            isMyMessage: true
        };

        handleMessage(activeChat.id, newMessage);
        setNewMessageText('');
    };

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
            <Stack direction="row" spacing={2} component='form' onSubmit={handleSubmit}>
                <Input
                    fullWidth
                    multiline
                    maxRows={4}
                    value={newMessageText}
                    onChange={(e) => setNewMessageText( e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    sx={{ ml: 1, flex: 1 }}
                    inputProps={{
                        'aria-label': 'message input',
                    }}
                />
                <IconButton
                    type="submit"
                    color="primary"
                    disabled={!newMessageText.trim()}
                    sx={{ p: '10px' }}
                >
                    <SendIcon />
                </IconButton>
                </Stack>

        </Stack>

    );
}

export default MessagesActive;