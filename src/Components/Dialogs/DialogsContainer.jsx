import { useSelector } from 'react-redux';
import Dialogs from './Dialogs';
import authRedirect from '../../HOC/AuthRedirect';
import { createSelector } from '@reduxjs/toolkit';

const selectDialogsData = createSelector(
  [(state) => state.dialogsPage, (state) => state.auth.isAuth],
  (dialogsPage, isAuth) => ({chats: dialogsPage.chats, isAuth})
)

const DialogsContainer = () => {
  const { chats, isAuth } = useSelector(selectDialogsData);
  return <Dialogs chats={chats} isAuth={isAuth} />;
}

export default authRedirect(DialogsContainer);