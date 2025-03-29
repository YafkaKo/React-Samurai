import { Input, ListItem } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setProfileStatusThunkCreator } from "../../../redux/profile-reducer";

const ProfileStatus = (props) =>{
  const {status} = props
  const dispatch = useDispatch()
  const [editMode,setEditMode] = useState(false)
  const [inputValue,setInputValue] = useState(status)


  const handleInput = (e) =>{
    setInputValue(e.target.value)
  }

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    console.log(inputValue)
    dispatch(setProfileStatusThunkCreator(inputValue))
  };


  return (
  <ListItem sx={{ p: 0, pb: '5px' }}>
      {!editMode ?
      <h4 onDoubleClick={activateEditMode} variant='h4'  >{inputValue}</h4>
      :
      <Input autoFocus value={inputValue} onBlur={deactivateEditMode}
      onKeyUp={(e) => e.key === 'Enter' && deactivateEditMode} onChange={handleInput}/>}
    </ListItem>
  )
}

export default ProfileStatus