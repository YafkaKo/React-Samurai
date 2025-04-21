import React, { useEffect, memo, useState, FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  Typography,
  // CircularProgress
} from "@mui/material";
import {
  getProfileStatusThunkCreator,
  getProfileThunkCreator,
  ProfileDispatch,
} from "../../redux/profile-reducer.ts";
import ProfileStatus from "./ProfileStatus/ProfileStatus.tsx";
import { createSelector } from "@reduxjs/toolkit";
import authRedirect from "../../HOC/AuthRedirect.tsx";
import MyPosts from "./MyPosts/MyPosts.tsx";
import ProfileEditMode from "./ProfileEditMode.tsx";
import Contacts from "./Contacts/Contacts.tsx";
import { RootState } from "../../redux/redux-store.ts";

const Profile: FC = memo(() => {
  const { idOfUser, profile, status } = useSelector(selectProfileData);
  let { id } = useParams<{ id?: string }>(); // Получаем id из URL
  if (!id) {
    id = idOfUser?.toString();
  }
  const [isOwner, setIsOwner] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<ProfileDispatch>();

  useEffect(() => {
    if (!idOfUser) {
      navigate("/login");
      return;
    }
    if(id){
      dispatch(getProfileThunkCreator(id));
      dispatch(getProfileStatusThunkCreator(id));
    }
    if (id === idOfUser.toString()) {
      setIsOwner(true);
    }
  }, [id, dispatch, navigate, idOfUser]); // Зависимости: id, dispatch, navigate, idOfUser

  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <></>;
  }

  return (
    <Box sx={{ p: "15px", width: "100%" }}>
      <Box sx={{ display: "flex", gap: "15px" }}>
        <Avatar
          alt="User Avatar"
          sx={{ width: 200, height: 200 }}
          src={
            profile.photos?.large ||
            "https://avatars.mds.yandex.net/i?id=419a79925d7b795e5ee9e5110747b2b1_l-12160792-images-thumbs&n=13"
          }
        />
        {editMode ? (
          <ProfileEditMode
          profile={profile}
          setEditMode={setEditMode}
        />
        ) : (
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
              <ListItem sx={{ p: 0, pb: "5px" }}>
                lookingForAJob:{" "}
                {profile.lookingForAJob === false ? "no" : "yes"}
              </ListItem>
              {profile.lookingForAJob ? (
                <ListItem sx={{ p: 0, pb: "5px" }}>
                  lookingForAJobDescription:{" "}
                  {profile.lookingForAJobDescription?.toString()}
                </ListItem>
              ) : null}
              <Contacts contacts={profile.contacts} />
              {isOwner?<Button variant="contained" onClick={() => setEditMode(true)}>
                Edit profile
              </Button>: null}
            </List>
          </Box>
        )}
      </Box>
      <MyPosts />
    </Box>
  );
});

const selectProfileData = createSelector(
  [(state:RootState) => state.profilePage, (state:RootState) => state.auth],
  (profilePage, auth) => ({
    idOfUser: auth.id,
    profile: profilePage.profile,
    // isFetching: profilePage.isFetching,
    status: profilePage.status,
  })
);

export default authRedirect(Profile);
