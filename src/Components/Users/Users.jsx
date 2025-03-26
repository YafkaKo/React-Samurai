import React from 'react';
import { NavLink } from "react-router";
import { Avatar, Box, Button, CircularProgress, List, ListItem, ListItemAvatar, Pagination, Paper, Typography } from '@mui/material';
import { followUsersThunkCreator } from '../../redux/users-reducer';
import { useDispatch } from 'react-redux';


const Users = (props) => {

  const { users, usersPerPage, handleCurrentPage, currentPage, totalCount, isFetching,FollowingIsProgress } = props;

  const dispatch = useDispatch()

    const totalPages = Math.ceil(totalCount / usersPerPage);

    return (
      <Box sx={{ margin: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
      <Pagination
        count={totalPages} // Общее количество страниц
        page={currentPage} // Текущая страница
        onChange={(event, page) => handleCurrentPage(page)} // Обработчик изменения страницы
        color="primary"
        sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}
        hidePrevButton
        hideNextButton
      />

      {/* Список пользователей */}
      <List  sx={{ width: "100%", boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        {isFetching ? <CircularProgress size={100} sx={{margin: ' 0 auto'}} /> : users.map((user) => (
          <Paper key={user.id} elevation={2} sx={{ width: "100%", borderRadius: "16px", marginBottom: "15px" }}>
            <ListItem sx={{ justifyContent: "space-between", alignItems: 'unset', gap: "10px" }}>
              <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100px", gap: '10px' }}>
              <NavLink to={`/profile/${user.id}`} style={{textDecoration: "none", color: "inherit",}}>
                <ListItemAvatar sx={{ width: "54px", height: '54px', minWidth: "auto" }}>
                  <Avatar sx={{width: '100%', height: '100%'}} src={user.photos.small}></Avatar>
                </ListItemAvatar>
                </NavLink>
                <Button
                  disabled={FollowingIsProgress.some(id=> id === user.id)}
                  sx={{ padding: "10px", width: "100%", lineHeight: "1" }}
                  variant="contained"
                  onClick={()=>dispatch(followUsersThunkCreator(user.id,user.followed))}
                                 >
                  {user.followed ? 'UNFOLLOW' : 'FOLLOW'}
                </Button>
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
        ))}

      </List>
    </Box>
    );
}

export default Users;