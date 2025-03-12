import React from 'react';
import {Box, Stack, Typography} from "@mui/material";

function Messages(props) {
    const {messages} = props.activeChat;
    return (
        <Stack spacing={2}>

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
                    <Typography sx={{display: "block", textAlign: "left", fontWeight: "600", color: "primary.main"}}>
                        {message.isMyMessage ? "Me" : message.nickname}
                    </Typography>
                    <Typography>{message.text}</Typography>
                </Box>
            ))}
        </Stack>
    );
}

export default Messages;