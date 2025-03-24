import { connect } from 'react-redux'
import Dialogs from './Dialogs'




const mapStateToProps = (state) => ({
  chats: state.dialogsPage.chats,
});


const DialogsContainer = connect(mapStateToProps, null)(Dialogs)

export default DialogsContainer