import React, { useEffect, useRef } from 'react'
import Post from './Post/Post'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button, List, ListItem, TextareaAutosize, Typography } from '@mui/material'
import { DispatchConst } from '../../../redux/store'
import { useSelector, useDispatch } from 'react-redux';



const MyPosts = () => {
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
    <Box>
      <Box sx={{ margin: '32px 0 32px 0', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h3" gutterBottom>My posts</Typography>
        <Box sx={{ marginBottom: '15px' }}>
          <TextareaAutosize
            ref={textareaRef}
            minRows={3}
            placeholder="Send..."
            style={{ width: '100%' }}
          />
        </Box>
        <Button sx={{ marginTop: '15px' }} variant="contained" endIcon={<SendIcon />}
          onClick={() => handlePost('name', 0)}
        >Send...</Button>
      </Box>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id} sx={{ p: 0, mb: '15px' }}>
            <Post
              key={post.id}
              user={post.user}
              avatar={post.avatar}
              text={post.text}
              likes={post.likes}
            />
          </ListItem>
        ))
        }
      </List>
    </Box>
  )
}


export default MyPosts