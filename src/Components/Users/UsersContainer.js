import React from 'react'
import { connect } from 'react-redux';
import { handleCurrentPage, handleFetching, handleFollow, handleFollowingProgress, handlePagination, handleUsers } from '../../redux/users-reducer';
import Users from './Users';
import UsersAPI from '../../API/API';

class UsersContainer extends React.Component {
  componentDidMount() {
    const { currentPage, usersPerPage } = this.props;

    this.props.handleFetching(true)
    UsersAPI.getUsersAPI(currentPage,usersPerPage).then(response => {
      this.props.handleFetching(false)
      this.props.handleUsers(response.items);
      this.props.handlePagination(usersPerPage, response.totalCount); // Передаем общее количество пользователей
    });
  }

  componentDidUpdate(prevProps) {
    const { currentPage, usersPerPage } = this.props;


    // Если изменилась текущая страница или количество пользователей на странице, загружаем новых пользователей
    if (prevProps.currentPage !== currentPage) {
      this.props.handleFetching(true)
      UsersAPI.getUsersAPI(currentPage,usersPerPage).then(response => {
        this.props.handleFetching(false)
        this.props.handleUsers(response.items);
      });
    }
  }

  render() {
    const { handleFollow, users, usersPerPage, handleCurrentPage, currentPage, totalCount, isFetching, handleFollowingProgress,FollowingIsProgress } = this.props;

    return (
      <Users handleFollow={handleFollow} users={users} usersPerPage={usersPerPage} handleCurrentPage={handleCurrentPage} currentPage={currentPage} totalCount={totalCount} isFetching = {isFetching} handleFollowingProgress={handleFollowingProgress} FollowingIsProgress={FollowingIsProgress}/>

    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.usersPage.users,
    paginationSize: state.usersPage.paginationSize,
    totalCount: state.usersPage.totalCount,
    usersPerPage: state.usersPage.paginationSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    FollowingIsProgress: state.usersPage.FollowingIsProgress,
  };
}

const mapDispatchesToProps = {
    handleFollow,
    handleUsers,
    handlePagination,
    handleCurrentPage,
    handleFetching,
    handleFollowingProgress
}

export default connect(
  mapStateToProps, mapDispatchesToProps
)(UsersContainer);