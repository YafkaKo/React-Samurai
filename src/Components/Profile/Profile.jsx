import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar, Box, List, ListItem, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { handleFetching, handleProfile } from '../../redux/profile-reducer';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const ProfileContainer = ({ profile, isFetching, handleFetching, handleProfile }) => {
  const { id } = useParams(); // Получаем id из URL

  useEffect(() => {
    handleFetching(true); // Устанавливаем состояние загрузки
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${id}`)
      .then(response => {
        handleProfile(response.data); // Передаем данные профиля в Redux
        handleFetching(false); // Убираем состояние загрузки
      })
      .catch(error => {
        console.error('Error fetching profile:', error);
        handleFetching(false); // Убираем состояние загрузки в случае ошибки
      });
  }, [id, handleFetching, handleProfile]); // Зависимости: id, handleFetching, handleProfile

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress /> {/* Preloader */}
      </Box>
    );
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <Box sx={{ p: '15px', width: '100%' }}>
      <Box
        component="img"
        sx={{ width: '100%', height: '300px', mb: '15px' }}
        src="https://i.pinimg.com/736x/82/b5/80/82b580dab030b6397b874244058c13df.jpg"
        alt=""
      />
      <Box sx={{ display: 'flex', gap: '15px' }}>
        <Avatar
          alt="User Avatar"
          sx={{ width: 200, height: 200 }}
          src={profile.photos?.small || 'https://avatars.mds.yandex.net/i?id=419a79925d7b795e5ee9e5110747b2b1_l-12160792-images-thumbs&n=13'}
        />
        <Box>
          <Typography variant="h3" component="h3">
            {profile.fullName}
          </Typography>
          <List>
            <ListItem sx={{ p: 0, pb: '5px' }}>Date of Birth: 2 january</ListItem>
            <ListItem sx={{ p: 0, pb: '5px' }}>City: Minsk</ListItem>
            <ListItem sx={{ p: 0, pb: '5px' }}>Education: BSU</ListItem>
            <ListItem sx={{ p: 0, pb: '5px' }}>Web-Site: blablabla</ListItem>
          </List>
        </Box>
      </Box>
      <MyPostsContainer />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  isFetching: state.profilePage.isFetching,
});

const mapDispatchToProps = {
  handleFetching,
  handleProfile,
};

const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
export default Profile