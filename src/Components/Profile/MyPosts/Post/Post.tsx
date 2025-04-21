import React, { useState,memo, FC } from "react";
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
import { handleLikesCount, ProfileDispatch } from "../../../../redux/profile-reducer.ts";
import { RootState } from "../../../../redux/redux-store.ts";

interface PropsType {
  id: number;
}

const Post: FC<PropsType> = memo((props) =>{
  const dispatch = useDispatch<ProfileDispatch>();
  const { id } = props;

  const post = useSelector((state:RootState) =>
    state.profilePage.posts.find((post) => post.id === id)
  )!;

  const { avatar, user, likes, text } =  post


  const [likeCount, setLikeCount] = useState<number>(likes);
  const [liked, setLiked] = useState<boolean>(false);

  const handleLike = (idOfPost:number, newLikesCount:number) => {
    dispatch(handleLikesCount(idOfPost, newLikesCount));
  };

  if (!post) return null;

  const toggleLike = () => {
    const newLikes:number = liked ? likeCount - 1 : likeCount + 1;
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
