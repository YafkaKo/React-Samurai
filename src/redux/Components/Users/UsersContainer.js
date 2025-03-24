import React from 'react'
import { connect } from 'react-redux';
import { handleCurrentPage, handleFetching, handleFollow, handlePagination, handleUsers } from '../../redux/users-reducer';
import axios from 'axios';
import Users from './Users';

class UsersContainer extends React.Component {
  componentDidMount() {
    const { currentPage, usersPerPage } = this.props;

    this.props.handleFetching(true)
    // Загрузка пользователей с учетом пагинации
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${usersPerPage}`).then(response => {
      this.props.handleFetching(false)
      this.props.handleUsers(response.data.items);
      this.props.handlePagination(usersPerPage, response.data.totalCount); // Передаем общее количество пользователей
    });
  }

  componentDidUpdate(prevProps) {
    const { currentPage, usersPerPage } = this.props;


    // Если изменилась текущая страница или количество пользователей на странице, загружаем новых пользователей
    if (prevProps.currentPage !== currentPage) {
      this.props.handleFetching(true)
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${usersPerPage}`).then(response => {
        this.props.handleFetching(false)
        this.props.handleUsers(response.data.items);
      });
    }
  }

  render() {
    const { handleFollow, users, usersPerPage, handleCurrentPage, currentPage, totalCount, isFetching } = this.props;

    return (
      <Users handleFollow={handleFollow} users={users} usersPerPage={usersPerPage} handleCurrentPage={handleCurrentPage} currentPage={currentPage} totalCount={totalCount} isFetching = {isFetching}/>

    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.usersPage.users,
    paginationSize: state.usersPage.paginationSize,
    totalCount: state.usersPage.totalCount,
    usersPerPage: state.usersPage.paginationSize, // Количество пользователей на странице
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching
  };
}

const mapDispatchesToProps = {
    handleFollow,
    handleUsers,
    handlePagination,
    handleCurrentPage,
    handleFetching
}

export default connect(
  mapStateToProps, mapDispatchesToProps
)(UsersContainer);