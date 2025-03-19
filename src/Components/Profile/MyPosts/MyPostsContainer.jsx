import React, { useEffect, useRef } from 'react'
import { DispatchConst } from '../../../redux/store'
import { useSelector, useDispatch } from 'react-redux';
import MyPosts from './MyPosts'



const MyPostsContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.profilePage.posts)
  const textareaRef = useRef()

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

  function handlePost(name, likes) {
    let newElement =
    {
      id: posts.length + 1,
      user: name,
      avatar: name.slice(0, 1).toUpperCase(),
      text: textareaRef.current.value,
      likes: likes,
    }
    dispatch({ type: DispatchConst.ADD_POST, newPost: newElement })
    textareaRef.current.value = ''
  }

  return (
    <MyPosts textareaRef={textareaRef} handlePost={handlePost} posts={posts} />
  )
}


export default MyPostsContainer