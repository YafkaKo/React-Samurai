import Post from './Post'
import { handleLikesCount } from '../../../../redux/profile-reducer';
import { connect } from 'react-redux';

// function PostContainer({ user, avatar, text, likes }) {


//     const [likeCount, setLikeCount] = React.useState(likes);
//     const likesInStart = likes;
//     const likesInEnd = likes + 1;

//     const handleLike = () => {
//         if (likesInStart === likeCount) {
//             setLikeCount(likeCount + 1);
//         }
//         if (likesInEnd === likeCount) {
//             setLikeCount(likeCount - 1);
//         }
//     };
//     return (
//         <Post user={user} avatar={avatar} text={text} likeCount={likeCount} handleLike={handleLike} />
//     );
// }

// export default PostContainer;

const mapStateToProps = (state, ownProps) => {
    const post = state.profilePage.posts.find((post) => post.id === ownProps.id); // Находим пост по id
    return {
        user: post.user,
        avatar: post.avatar,
        text: post.text,
        likes: post.likes,
        id:post.id
    };
};


const mapDispatchesToProps = (dispatch) => {
    return {
        handleLike: (idOfPost, newLikesCount) => {
            dispatch(handleLikesCount(idOfPost, newLikesCount))
        },
    }
}

const PostContainer = connect(mapStateToProps, mapDispatchesToProps)(Post)


export default PostContainer