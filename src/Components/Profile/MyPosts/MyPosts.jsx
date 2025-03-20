import React, { useEffect, useRef } from 'react'
import PostContainer from './Post/PostContainer'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button, List, ListItem, TextareaAutosize, Typography } from '@mui/material'




const MyPosts = (props) => {
  const { handlePost, posts } = props

  const textareaRef = useRef()

  useEffect(() => {
    textareaRef.current.focus()
  }, [])

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
          onClick={() => {
            let newElement =
            {
              id: posts.length + 1,
              user: 'Ivan',
              avatar: 'I',
              text: textareaRef.current.value,
              likes: 0,
            }
            handlePost(newElement)
            textareaRef.current.value = ''
          }}
        >Send...</Button>
      </Box>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id} sx={{ p: 0, mb: '15px' }}>
            <PostContainer id={post.id} />
          </ListItem>
        ))
        }
      </List>
    </Box>
  )
}


export default MyPosts