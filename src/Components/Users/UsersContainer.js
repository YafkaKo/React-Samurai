import React from 'react'
import { connect } from 'react-redux';
import { setCurrentPage, setFollowActionCreator, setPagintationAC, setUsersAC } from '../../redux/users-reducer';
import axios from 'axios';
import Users from './Users';

class UsersContainer extends React.Component {
  componentDidMount() {
    const { currentPage, usersPerPage } = this.props;

    // Загрузка пользователей с учетом пагинации
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${usersPerPage}`).then(response => {
      this.props.handleUsers(response.data.items);
      this.props.handlePagination(usersPerPage, response.data.totalCount); // Передаем общее количество пользователей
    });
  }

  componentDidUpdate(prevProps) {
    const { currentPage, usersPerPage } = this.props;

    // Если изменилась текущая страница или количество пользователей на странице, загружаем новых пользователей
    if (prevProps.currentPage !== currentPage) {
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${usersPerPage}`).then(response => {
        this.props.handleUsers(response.data.items);
      });
    }
  }

  render() {
    const { handleFollow, users, usersPerPage, handleCurrentPage, currentPage, totalCount } = this.props;

    return (
      <Users handleFollow={handleFollow} users={users} usersPerPage={usersPerPage} handleCurrentPage={handleCurrentPage} currentPage={currentPage} totalCount={totalCount}/>

    );
  }
}

function mapStateToProps(state) {
  return {
    users: state.usersPage.users,
    paginationSize: state.usersPage.paginationSize,
    totalCount: state.usersPage.totalCount,
    usersPerPage: state.usersPage.paginationSize, // Количество пользователей на странице
    currentPage: state.usersPage.currentPage
  };
}

const mapDispatchesToProps = (dispatch) => {
  return {
    handleFollow: (idOfPost, newFollow) => {
      dispatch(setFollowActionCreator(newFollow, idOfPost))
    },
    handleUsers: (newState) => {
      dispatch(setUsersAC(newState))
    },
    handlePagination: (paginationSize,totalCount)=>{
      dispatch(setPagintationAC(paginationSize,totalCount))
    },
    handleCurrentPage: (currentPage)=>{
      dispatch(setCurrentPage(currentPage))
    }
  }
}

export default connect(
  mapStateToProps, mapDispatchesToProps
)(UsersContainer);