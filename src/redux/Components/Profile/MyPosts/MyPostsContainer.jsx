import MyPosts from './MyPosts'
import { handlePost } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  }
}



const mapDispatchesToProps = (dispatch) => {
  return {
    handlePost: (newPost) => {
      dispatch(handlePost(newPost))
    },
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchesToProps)(MyPosts)


export default MyPostsContainer