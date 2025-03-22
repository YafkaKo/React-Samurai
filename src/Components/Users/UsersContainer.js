import { connect } from 'react-redux';
import Users from './Users'
import { setCurrentPage, setFollowActionCreator, setPagintationAC, setUsersAC } from '../../redux/users-reducer';

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

const UsersContainer = connect(
  mapStateToProps, mapDispatchesToProps
)(Users);
export default UsersContainer