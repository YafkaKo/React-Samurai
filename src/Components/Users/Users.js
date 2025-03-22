import React from 'react';
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, Pagination, Paper, Typography } from '@mui/material';
import axios from 'axios';

class Users extends React.Component {
  componentDidMount() {
    const { currentPage, usersPerPage } = this.props;

    // Загрузка пользователей с учетом пагинации
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${usersPerPage}`).then(response => {
      this.props.handleUsers(response.data.items);
      this.props.handlePagination(3, response.data.totalCount); // Передаем общее количество пользователей
    });
  }

  componentDidUpdate(prevProps) {
    const { currentPage, usersPerPage } = this.props;

    // Если изменилась текущая страница или количество пользователей на странице, загружаем новых пользователей
    if (prevProps.currentPage !== currentPage) {
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${usersPerPage}`).then(response => {
        this.props.handleUsers(response.data.items);
      });
    }
  }

  render() {
    const { handleFollow, users, usersPerPage, handleCurrentPage, currentPage, totalCount } = this.props;

    // Общее количество страниц
    const totalPages = Math.ceil(totalCount / usersPerPage);

    return (
      <Box sx={{ margin: '15px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Пагинация */}
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
        <List sx={{ width: "100%", boxSizing: 'border-box' }}>
          {users.map((user) => (
            <Paper key={user.id} elevation={2} sx={{ width: "100%", borderRadius: "16px", marginBottom: "15px" }}>
              <ListItem sx={{ justifyContent: "space-between", alignItems: 'unset', gap: "10px" }}>
                <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", width: "100px", gap: '10px' }}>
                  <ListItemAvatar sx={{ width: "40px", minWidth: "auto" }}>
                    <Avatar>{user.avatar ? user.avatar : user.name[0].toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <Button
                    sx={{ padding: "10px", width: "100%", lineHeight: "1" }}
                    variant="contained"
                    onClick={() => handleFollow(user.id, !user.follow)}
                  >
                    {user.follow ? 'UNFOLLOW' : 'FOLLOW'}
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
}

export default Users;