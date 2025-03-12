import React from 'react';
import {Box, Divider, Stack, Tab, Tabs, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import Messages from "./Messages/Messages";


export default function Dialogs(props) {

    const {chats} = props.Dialogs;

    const navigate = useNavigate();

    const {chatId} = useParams(); // Получаем chatId из URL
    const [chatUser, setChatUser] = React.useState(chatId ? parseInt(chatId) : false);

    const handleChange = (event, chatUser) => {
        ++chatUser
        setChatUser(chatUser);
        navigate(`/dialogs/${chatUser}`);
    };

    let activeChat = undefined;
    if (typeof chatUser === 'number') {
        activeChat = chats.find((chat) => chat.id === chatUser );
    }


    return (
        <Box sx={{
            width: "100%",
            padding: "15px",
        }}>
            <Typography sx={{fontWeight: "bold"}} variant="h4" component="h4">Dialogs</Typography>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem
                                                     sx={{ml: 0,width: "2px", backgroundColor: "primary.main"}}/>}>
                <Tabs value={chatUser-1} onChange={handleChange} orientation="vertical" scrollButtons="auto"
                      aria-label="basic tabs example">
                    {chats.map((chat) => (
                        <Tab key={chat.id} label={chat.nickname} sx={{
                            fontSize: 24,
                            color: "text.primary",
                            pl: 0,
                        }}/>
                    ))}
                </Tabs>
                <Box sx={{flexGrow: 1, padding: "10px"}}>
                    {activeChat ? (
                        <Messages activeChat={activeChat} />
                    ) : (
                        <Typography variant="h4" sx={{textAlign: "center"}}>Select a chat to start messaging</Typography>
                    )}
                </Box>
            </Stack>
        </Box>
    );
};