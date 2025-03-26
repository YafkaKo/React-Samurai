import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import {
  getUsersThunkCreator,
  handleCurrentPage,
  handleFollow,
  handleFollowingProgress
} from '../../redux/users-reducer';
import Users from './Users';
import authRedirect from '../../HOC/AuthRedirect';

// Оптимизированный селектор

const selectUsersData = createSelector(
  [(state) => state.usersPage],
  (usersPage) => ({
    users: usersPage.users,
    currentPage: usersPage.currentPage,
    usersPerPage: usersPage.paginationSize,
    totalCount: usersPage.totalCount,
    isFetching: usersPage.isFetching,
    FollowingIsProgress: usersPage.FollowingIsProgress

  })
);


const UsersContainer = (props) => {
  const dispatch = useDispatch();
  const usersData = useSelector(selectUsersData);

  useEffect(() => {
    dispatch(getUsersThunkCreator(usersData.currentPage, usersData.usersPerPage));
  }, [usersData.currentPage, usersData.usersPerPage, dispatch]);

  const usersProps = {
    ...usersData,
    handleFollow: (userId, isFollowed) => dispatch(handleFollow(userId, isFollowed)),
    handleCurrentPage: (page) => dispatch(handleCurrentPage(page)),
    handleFollowingProgress: (isFetching, userId) =>
      dispatch(handleFollowingProgress(isFetching, userId))
  };

  return <Users {...usersProps} />;
};



export default authRedirect(UsersContainer);