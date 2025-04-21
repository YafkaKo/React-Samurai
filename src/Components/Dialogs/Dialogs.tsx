import React, { FC, useEffect } from "react";
import {
  Avatar,
  Box,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import MessagesActiveContainer from "./MessagesActive/MessagesActiveContainer.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { ChatType } from "../../redux/dialogs-reducer.ts";

type PropsType = {
  chats: ChatType[],
  isAuth:boolean
}

const Dialogs: FC<PropsType> = (props) => {
  const { chats, isAuth } = props;

  const navigate = useNavigate();
  const { chatId } = useParams();
  const [chatUser, setChatUser] = React.useState<number>(chatId ? parseInt(chatId) : 0);

  let activeChat:ChatType|undefined = undefined;

  if (typeof chatUser === "number") {
    activeChat = chats.find((chat) => chat.id === chatUser);
  }

  const handleChange = (event , chatUser:number) => {
    ++chatUser;
    setChatUser(chatUser);
    navigate(`/dialogs/${chatUser}`);
  };

  useEffect(()=>{
    if (isAuth === false) {
      navigate(`/login`);
    }
  },[isAuth,navigate])

  return (
    <Box
      sx={{
        width: "100%",
        padding: "15px",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }} variant="h4" component="h4">
        Dialogs
      </Typography>
      <Stack
        direction="row"
        sx={{ flexGrow: "1" }}
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              ml: 0,
              width: "2px",
              backgroundColor: "primary.main",
            }}
          />
        }
      >
        <Tabs
          value={chatUser === -1 ? 0 : chatUser - 1}
          onChange={handleChange}
          orientation="vertical"
          scrollButtons="auto"
          aria-label="basic tabs example"
        >
          {chats.map((chat) => (
            <Tab
              key={chat.id}
              label={
                <>
                  <Avatar>{chat.nickname.slice(0, 1).toUpperCase()}</Avatar>
                  {chat.nickname}
                </>
              }
              sx={{
                fontSize: 24,
                color: "text.primary",
                pl: 0,
                display: "flex",
                flexDirection: "row",
                gap: 1,
                justifyContent: "space-between",
              }}
            />
          ))}
        </Tabs>
        <Box sx={{ display: "flex", flexGrow: 1, padding: "10px" }}>
          {activeChat ? (
            <MessagesActiveContainer
              activeChat={activeChat}
              count={activeChat.id - 1}
            ></MessagesActiveContainer>
          ) : (
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Select a chat to start messaging
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default Dialogs;
