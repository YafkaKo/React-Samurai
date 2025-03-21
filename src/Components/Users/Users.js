import { Avatar, Box, Button, List, ListItem, ListItemAvatar, Paper, Typography } from '@mui/material';
import React from 'react';

const Users = (props) => {
  const { handleFollow, users } = props

  return (
    <List sx={{ width: "100%", margin: "15px" }}>
      {users.map((user) => (
        <Paper elevation={2} sx={{ width: "100%", borderRadius: "16px", marginBottom: "15px" }}>
          <ListItem key={user.id} sx={{ justifyContent: "space-between", alignItems: 'unset', gap: "10px" }}>
            <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100px", gap: '10px' }}>
              <ListItemAvatar sx={{ width: "40px", minWidth: "auto" }}><Avatar>{user.avatar ? user.avatar : user.nickname[0].toUpperCase()}</Avatar></ListItemAvatar>
              <Button sx={{ padding: "10px", width: "100%", lineHeight: "1" }} variant="contained"
                onClick={() => {
                  handleFollow(user.id, user.follow ? false : true);
                }}
              >{user.follow ? 'UNFOLLOW' : 'FOLLOW'}</Button>
            </Box>
            <Box display="flex" sx={{ flexGrow: 1, gap: "10px" }}>
              <Box display='flex' sx={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant='h4'>{user.nickname}</Typography>
                <Typography sx={{ flexGrow: 1, alignContent: "end" }}>{user.status}</Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                <Typography variant='h4'>{user.country},</Typography>
                <Typography variant='h4'>{user.city}</Typography>
              </Box>
            </Box>



          </ListItem>
        </Paper>
      ))
      }

    </List >
  )
}

export default Users;