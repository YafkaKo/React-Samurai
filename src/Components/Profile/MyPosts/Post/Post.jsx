import React, { useState } from 'react';
import {
    Avatar,
    Typography,
    IconButton,
    Box,
    Paper,
    Stack,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Post(props) {
    const { handleLike, avatar, user, likes, text, id } = props
    const [handleLikeBool, setHandleLikeBool] = useState(false)


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
                    <IconButton size="small" onClick={() => {
                        if (handleLikeBool === false) {
                            console.log("Increment")
                            handleLike(id, likes + 1)
                            setHandleLikeBool(!handleLikeBool)
                        } if (handleLikeBool === true) {
                            console.log("Decrement")
                            handleLike(id, likes - 1)
                            setHandleLikeBool(!handleLikeBool)
                        }
                    }}>
                        <ThumbUpIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2">{likes}</Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default Post;