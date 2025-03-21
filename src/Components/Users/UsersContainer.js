import { connect } from 'react-redux';
import Users from './Users'
import { setFollowActionCreator } from '../../redux/users-reducer';

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
  }
}

const UsersContainer = connect(
  mapStateToProps, mapDispatchesToProps
)(Users);
export default UsersContainer