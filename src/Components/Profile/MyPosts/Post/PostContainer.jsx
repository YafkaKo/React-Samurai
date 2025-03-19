import React from 'react';
import Post from './Post'

function PostContainer({ user, avatar, text, likes }) {


    const [likeCount, setLikeCount] = React.useState(likes);
    const likesInStart = likes;
    const likesInEnd = likes + 1;

    const handleLike = () => {
        if (likesInStart === likeCount) {
            setLikeCount(likeCount + 1);
        }
        if (likesInEnd === likeCount) {
            setLikeCount(likeCount - 1);
        }
    };
    return (
        <Post user={user} avatar={avatar} text={text} likeCount={likeCount} handleLike={handleLike} />
    );
}

export default PostContainer;