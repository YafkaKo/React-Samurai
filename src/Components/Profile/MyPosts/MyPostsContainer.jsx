import MyPosts from './MyPosts'
import { addPostActionCreator } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
  }
}



const mapDispatchesToProps = (dispatch) => {
  return {
    handlePost: (newPost) => {
      dispatch(addPostActionCreator(newPost))
    },
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchesToProps)(MyPosts)


export default MyPostsContainer