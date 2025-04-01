import React, { useState,memo } from "react";
import {
  Avatar,
  Typography,
  IconButton,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useDispatch, useSelector } from "react-redux";
import { handleLikesCount } from "../../../../redux/profile-reducer";

const Post = memo((props) =>{
  console.log("render Post");
  const dispatch = useDispatch();
  const { id } = props;

  const post = useSelector((state) =>
    state.profilePage.posts.find((post) => post.id === id)
  );
  const { avatar, user, likes, text } = post;
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false);

  const handleLike = (idOfPost, newLikesCount) => {
    dispatch(handleLikesCount(idOfPost, newLikesCount));
  };



  if (!post) return null;



  const toggleLike = () => {
    const newLikes = liked ? likeCount - 1 : likeCount + 1;
    handleLike(id, newLikes);
    setLikeCount(newLikes);
    setLiked(!liked);
  };

  return (
    <Paper elevation={2} sx={{ padding: 2, width: "100%" }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar>{avatar}</Avatar>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold">
            {user}
          </Typography>
          <Typography variant="body1">{text}</Typography>
        </Box>

        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton size="small" onClick={toggleLike}>
            <ThumbUpIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{likeCount}</Typography>
        </Stack>
      </Stack>
    </Paper>
)
}
)

export default Post;
