import React from 'react';
import { useSelector } from 'react-redux';
import Dialogs from './Dialogs.tsx';
import authRedirect from '../../HOC/AuthRedirect.tsx';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../redux/redux-store';
import { FC } from 'react';

const selectDialogsData = createSelector(
  [(state:RootState) => state.dialogsPage, (state:RootState) => state.auth.isAuth],
  (dialogsPage, isAuth) => ({chats: dialogsPage.chats, isAuth})
)

const DialogsContainer: FC = () => {
  const { chats, isAuth } = useSelector(selectDialogsData);
  return <Dialogs chats={chats} isAuth={isAuth} />;
}

export default authRedirect(DialogsContainer);