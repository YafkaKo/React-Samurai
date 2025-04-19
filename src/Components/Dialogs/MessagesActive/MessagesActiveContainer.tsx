// import React from 'react'
import MessagesActive from "./MessagesActive.tsx";
import { connect } from "react-redux";
import {
  addMessageActionCreator,
  ChatType,
  MessageType,
} from "../../../redux/dialogs-reducer.ts";
import { RootState } from "../../../redux/redux-store.ts";

type PropsTypeToState = {
  activeChat: ChatType;
  count: number;
};

type PropsType = {
  activeChat: ChatType;
  messages: MessageType[];
};

const mapStateToProps = (
  state: RootState,
  props: PropsTypeToState
): PropsType => {
  const { activeChat, count } = props;

  return {
    activeChat: activeChat,
    messages: state.dialogsPage.chats[count].messages,
  };
};

const mapDispatchesToProps = (dispatch: any): object => {
  return {
    handleMessage: (idOfUser: number, newMessage: MessageType) => {
      dispatch(addMessageActionCreator(newMessage, idOfUser));
    },
  };
};

const MessagesActiveContainer = connect(
  mapStateToProps,
  mapDispatchesToProps
)(MessagesActive);

export default MessagesActiveContainer;
