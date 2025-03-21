import { Avatar, Box, Button, List, ListItem, ListItemAvatar, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';


const Users = (props) => {
  const { handleFollow, handleUsers, users } = props
  if (users.length === 0) {
    axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => handleUsers(response.data.items))
  }

  const [visibleUsers, setVisibleUsers] = useState(5);

  // Функция для подгрузки ещё 5 пользователей
  const handleShowMore = () => {
    setVisibleUsers((prevVisibleUsers) => prevVisibleUsers + 5);
  };

  // Отображаем только первых `visibleUsers` пользователей
  const usersToShow = users.slice(0, visibleUsers);

  return (
    <Box sx={{ margin: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <List sx={{ width: "100%", boxSizing: 'border-box' }}>
        {usersToShow.map((user) => (
          <Paper key={user.id} elevation={2} sx={{ width: "100%", borderRadius: "16px", marginBottom: "15px" }}>
            <ListItem sx={{ justifyContent: "space-between", alignItems: 'unset', gap: "10px" }}>
              <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100px", gap: '10px' }}>
                <ListItemAvatar sx={{ width: "40px", minWidth: "auto" }}><Avatar>{user.avatar ? user.avatar : user.name[0].toUpperCase()}</Avatar></ListItemAvatar>
                <Button sx={{ padding: "10px", width: "100%", lineHeight: "1" }} variant="contained"
                  onClick={() => {
                    handleFollow(user.id, user.follow ? false : true);
                  }}
                >{user.follow ? 'UNFOLLOW' : 'FOLLOW'}</Button>
              </Box>
              <Box display="flex" sx={{ flexGrow: 1, gap: "10px" }}>
                <Box display='flex' sx={{ flexGrow: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Typography variant='h4'>{user.name}</Typography>
                  <Typography sx={{ flexGrow: 1, alignContent: "end" }}>{"user.status"}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                  <Typography variant='h4'>{"user.country"},</Typography>
                  <Typography variant='h4'>{"user.city"}</Typography>
                </Box>
              </Box>



            </ListItem>
          </Paper>
        ))
        }

      </List >
      {visibleUsers < users.length && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Button
            variant="contained"
            onClick={handleShowMore}
            sx={{ padding: '10px 20px', fontWeight: 'bold' }}
          >
            Show More
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Users;