import { connect } from 'react-redux'
import Dialogs from './Dialogs'
import authRedirect from '../../HOC/AuthRedirect';



const mapStateToProps = (state) => ({
  chats: state.dialogsPage.chats
});

const AuthRedirectComponent = authRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, null)(AuthRedirectComponent)

export default DialogsContainer