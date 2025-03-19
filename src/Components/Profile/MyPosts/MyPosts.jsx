import React from 'react'
import PostContainer from './Post/PostContainer'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button, List, ListItem, TextareaAutosize, Typography } from '@mui/material'



const MyPosts = (props) => {
  const { textareaRef, handlePost, posts } = props
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
            <PostContainer
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