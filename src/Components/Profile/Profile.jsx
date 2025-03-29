import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  Avatar,
  Box,
  List,
  ListItem,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  getProfileStatusThunkCreator,
  getProfileThunkCreator,
  handleFetching,
  handleProfile,
} from "../../redux/profile-reducer";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
// import authRedirect from '../../HOC/AuthRedirect';
import ProfileStatus from "./ProfileStatus/ProfileStatus";

const ProfileContainer = (props) => {
  const {idOfUser, profile, status, isFetching, handleFetching, handleProfile } = props;
  let { id } = useParams(); // Получаем id из URL
  if(!id)id = idOfUser
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileThunkCreator(id));
    dispatch(getProfileStatusThunkCreator(id));
  }, [id, handleFetching, handleProfile, dispatch]); // Зависимости: id, handleFetching, handleProfile

  if (isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress /> {/* Preloader */}
      </Box>
    );
  }

  if (!profile) {
    return <Box sx={{display:'flex',justifyContent:'center',marginTop:'50px', flexGrow: 1}}><Typography variant='h1'>Profile not found</Typography></Box>;
  }

  return (
    <Box sx={{ p: "15px", width: "100%" }}>
      {/* <Box
        component="img"
        sx={{ width: '100%', height: '300px', mb: '15px' }}
        src="https://i.pinimg.com/736x/82/b5/80/82b580dab030b6397b874244058c13df.jpg"
        alt=""
      /> */}
      <Box sx={{ display: "flex", gap: "15px" }}>
        <Avatar
          alt="User Avatar"
          sx={{ width: 200, height: 200 }}
          src={
            profile.photos?.small ||
            "https://avatars.mds.yandex.net/i?id=419a79925d7b795e5ee9e5110747b2b1_l-12160792-images-thumbs&n=13"
          }
        />
        <Box>
          <Typography variant="h3" component="h3">
            {profile.fullName}
          </Typography>
          <List>
            <ProfileStatus status={status} />
            <ListItem sx={{ p: 0, pb: "5px" }}>
              Date of Birth: 2 january
            </ListItem>
            <ListItem sx={{ p: 0, pb: "5px" }}>City: Minsk</ListItem>
            <ListItem sx={{ p: 0, pb: "5px" }}>Education: BSU</ListItem>
            <ListItem sx={{ p: 0, pb: "5px" }}>Web-Site: blablabla</ListItem>
          </List>
        </Box>
      </Box>
      <MyPostsContainer />
    </Box>
  );
};

const mapStateToProps = (state) => ({
  idOfUser: state.auth.id,
  profile: state.profilePage.profile,
  isFetching: state.profilePage.isFetching,
  status: state.profilePage.status,
});

const mapDispatchToProps = {
  handleFetching,
  handleProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
