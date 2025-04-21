import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getUsersThunkCreator,
  handleCurrentPage,
} from '../../redux/users-reducer.ts';
import Users from './Users.tsx';
import authRedirect from '../../HOC/AuthRedirect.tsx';
import { RootState } from '../../redux/redux-store.ts';
import { UsersDispatch } from '../../redux/users-reducer.ts';
import { UsersPropsType } from '../../types/types.ts';


const selectUsersData = createSelector(
  [(state:RootState) => state.usersPage],
  (usersPage) => ({
    users: usersPage.users,
    currentPage: usersPage.currentPage,
    usersPerPage: usersPage.usersPerPage,
    totalCount: usersPage.totalCount,
    isFetching: usersPage.isFetching,
    FollowingIsProgress: usersPage.FollowingIsProgress
  })
);


const UsersContainer: FC = () => {
  const dispatch = useDispatch<UsersDispatch>();
  const usersData = useSelector(selectUsersData);

  useEffect(() => {
    dispatch(getUsersThunkCreator(usersData.currentPage, usersData.usersPerPage));
  }, [usersData.currentPage, usersData.usersPerPage, dispatch]);

  const usersProps:UsersPropsType = {
    ...usersData,
    handleCurrentPage: (page:number) => dispatch(handleCurrentPage(page)),
  };

  return <Users {...usersProps} />;
};



export default authRedirect(UsersContainer);