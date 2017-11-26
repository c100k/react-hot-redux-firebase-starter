import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import {listenToMessages, listenToUsers, leaveRoom} from '../../actions/chatActions';
import ChatMessageForm from './ChatMessageForm';
import ChatRoomUsersWidget from './ChatRoomUsersWidget';
import ChatRoomMessagesWidget from './ChatRoomMessagesWidget';

export class ChatRoomPage extends React.Component {
  constructor(props) {
    super(props);

    this.roomKey = this.props.params.roomKey;

    this.leaveRoom = this.leaveRoom.bind(this);

    this.props.actions.listenToMessages(this.roomKey);
    this.props.actions.listenToUsers(this.roomKey);
  }

  leaveRoom() {
    this.props.actions.leaveRoom(this.roomKey);
  }

  render() {
    if (this.props.successNotification) {
      toastr.success(this.props.successNotification);
    }
    return (
      <div className="chat">
        <h1>Chat Room</h1>

        <button
          className="btn btn-default btn-sm pull-right"
          onClick={this.leaveRoom}
        >
          {'Leave this room'}
        </button>
        <div className="clearfix"></div>

        <ChatRoomUsersWidget />
        <ChatRoomMessagesWidget />
        <ChatMessageForm roomKey={this.roomKey} />
      </div>
    );
  }
}

ChatRoomPage.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.shape({
    roomKey: PropTypes.string.isRequired
  }).isRequired,
  successNotification: PropTypes.string
};

function mapStateToProps(state, ownProps) {
  return {
    successNotification: state.chat.successNotification
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({listenToMessages, listenToUsers, leaveRoom}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);
