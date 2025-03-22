import { connect } from 'react-redux';
import Users from './Users'
import { setFollowActionCreator, setUsersAC } from '../../redux/users-reducer';

function mapStateToProps(state) {
  return {
    users: state.usersPage.users
  };
}

const mapDispatchesToProps = (dispatch) => {
  return {
    handleFollow: (idOfPost, newFollow) => {
      dispatch(setFollowActionCreator(newFollow, idOfPost))
    },
    handleUsers: (newState) => {
      dispatch(setUsersAC(newState))
    }
  }
}

const UsersContainer = connect(
  mapStateToProps, mapDispatchesToProps
)(Users);
export default UsersContainer