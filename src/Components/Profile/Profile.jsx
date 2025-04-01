import React, { useEffect,memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
} from "../../redux/profile-reducer";
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import { createSelector } from "@reduxjs/toolkit";
import authRedirect from "../../HOC/AuthRedirect";
import MyPosts from "./MyPosts/MyPosts";

const Profile = memo(() => {
  console.log('render Profile')
  const { idOfUser, profile, status, isFetching } = useSelector(selectProfileData);
  let { id } = useParams(); // Получаем id из URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!idOfUser) {
      navigate("/login");
      return;
    }
    dispatch(getProfileThunkCreator(id));
    dispatch(getProfileStatusThunkCreator(id));
  }, [id, dispatch, navigate, idOfUser]); // Зависимости: id, dispatch, navigate, idOfUser

  if (isFetching || !profile) {
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

  return (
    <Box sx={{ p: "15px", width: "100%" }}>
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
      <MyPosts />
    </Box>
  )
}
)

const selectProfileData = createSelector(
  [(state) => state.profilePage, (state) => state.auth],
  (profilePage, auth) => ({
    idOfUser: auth.id,
    profile: profilePage.profile,
    isFetching: profilePage.isFetching,
    status: profilePage.status,
  })
);

export default authRedirect(Profile);
