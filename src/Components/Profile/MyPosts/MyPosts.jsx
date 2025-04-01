import React, { useState,memo } from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  List,
  ListItem,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { handlePost } from "../../../redux/profile-reducer";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post/Post";

const MyPosts = memo((props) => {
  console.log('render MyPosts')
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.profilePage.posts);

  const handlePostAction = (newPost) => {
    dispatch(handlePost(newPost));
  };

  const [newPostText, setNewPostText] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPost();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendPost();
  };

  const sendPost = () => {
    if (!newPostText.trim()) return;

    let newElement = {
      id: posts.length + 1,
      user: "Ivan",
      avatar: "I",
      text: newPostText,
      likes: 0,
    };

    handlePostAction(newElement);
    setNewPostText("");
  };

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          margin: "32px 0 32px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h3" gutterBottom>
          My posts
        </Typography>
        <Box sx={{ marginBottom: "15px" }}>
          <TextareaAutosize
            aria-label="Create new post"
            value={newPostText}
            minRows={3}
            placeholder="Send..."
            style={{ width: "100%" }}
            onChange={(e) => setNewPostText(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </Box>
        <Button
          sx={{ marginTop: "15px" }}
          variant="contained"
          endIcon={<SendIcon />}
          type="submit"
          disabled={!newPostText.trim()}
        >
          Send...
        </Button>
      </Box>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id} sx={{ p: 0, mb: "15px" }}>
            <Post id={post.id} />
          </ListItem>
        ))}
      </List>
    </Box>
  )
}
)

export default MyPosts;
