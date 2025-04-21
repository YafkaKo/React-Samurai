import { Input, ListItem, Typography } from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { ProfileDispatch, setProfileStatusThunkCreator } from "../../../redux/profile-reducer.ts";

interface PropsType {
  status: string|null;
}

const ProfileStatus: FC<PropsType> = (props) => {
  const { status } = props;

  const dispatch = useDispatch<ProfileDispatch>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string|null>(status);

  const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    if(inputValue)
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
