import { Input, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProfileStatusThunkCreator } from "../../../redux/profile-reducer.ts";

const ProfileStatus = (props) => {
  const { status } = props;

  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(status);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    dispatch(setProfileStatusThunkCreator(inputValue));
  };

  return (
    <ListItem sx={{ p: 0, pb: "5px" }}>
      {!editMode ? (
        <Typography onDoubleClick={activateEditMode} variant="h4">
          {inputValue}
        </Typography>
      ) : (
        <Input
          autoFocus
          value={inputValue}
          onBlur={deactivateEditMode}
          onKeyUp={(e) => e.key === "Enter" && deactivateEditMode}
          onChange={handleInput}
        />
      )}
    </ListItem>
  );
};

export default ProfileStatus;
