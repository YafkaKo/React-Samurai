// import React from 'react'
import MessagesActive from "./MessagesActive.tsx";
import { connect } from "react-redux";
import {
  addMessageActionCreator,
  ChatType,
  MessageType,
} from "../../../redux/dialogs-reducer.ts";
import { RootState } from "../../../redux/redux-store.ts";
import { ActionType } from "../../../types/types.ts";

type OwnProps = {
  activeChat: ChatType;
  count: number;
};

type StateProps = {
  activeChat: ChatType,
  messages: MessageType[];
};

type DispatchProps = {
  handleMessage: (idOfUser: number, newMessage: MessageType) => ActionType;
};

const mapStateToProps = (
  state: RootState,
  props: OwnProps
): StateProps => {
  const { activeChat, count } = props;

  return {
    activeChat: activeChat,
    messages: state.dialogsPage.chats[count].messages,
  };
};

const mapDispatchToProps: DispatchProps = {
  handleMessage: (idOfUser, newMessage) =>
    addMessageActionCreator(newMessage, idOfUser),
};

const MessagesActiveContainer = connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(MessagesActive);

export default MessagesActiveContainer;
