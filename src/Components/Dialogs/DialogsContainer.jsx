import { connect } from 'react-redux'
import Dialogs from './Dialogs'
import authRedirect from '../../HOC/AuthRedirect';
import { compose } from 'redux';



const mapStateToProps = (state) => ({
  chats: state.dialogsPage.chats
});


export default compose(
  authRedirect,
  connect(mapStateToProps, null)
)(Dialogs)