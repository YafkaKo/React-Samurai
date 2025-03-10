import React from 'react';
import {
    Avatar,
    Typography,
    IconButton,
    Box,
    Paper,
    Stack,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Post({ user, avatar, text, likes }) {
    const [likeCount, setLikeCount] = React.useState(likes);
    const likesInStart = likes;
    const likesInEnd = likes+1;

    const handleLike = () => {
        if (likesInStart === likeCount) {
            setLikeCount(likeCount + 1);
        }
        if (likesInEnd === likeCount) {
            setLikeCount(likeCount - 1);
        }
    };
    return (
        <Paper elevation={2} sx={{ padding: 2, width: "100%"}}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar>{avatar}</Avatar>

                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                        {user}
                    </Typography>
                    <Typography variant="body1">{text}</Typography>
                </Box>

                <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton size="small" onClick={handleLike}>
                        <ThumbUpIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="body2">{likeCount}</Typography>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default Post;