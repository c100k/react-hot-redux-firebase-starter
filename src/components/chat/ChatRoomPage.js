import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import {listenToMessages, listenToUsers, postMessage, leaveRoom} from '../../actions/chatActions';
import ChatMessageForm from './ChatMessageForm';
import ChatRoomUsersWidget from './ChatRoomUsersWidget';
import ChatRoomMessagesWidget from './ChatRoomMessagesWidget';

export class ChatRoomPage extends React.Component {
  constructor(props) {
    super(props);

    this.roomKey = this.props.params.roomKey;

    this.initialState = {
      message: '',
      saving: false
    };

    this.state = Object.assign({}, this.initialState);

    this.updateMessage = this.updateMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);

    this.props.actions.listenToMessages(this.roomKey);
    this.props.actions.listenToUsers(this.roomKey);
  }

  updateMessage(event) {
    this.setState({message: event.target.value});
  }

  postMessage(event) {
    event.preventDefault();

    this.setState({saving: true});

    this.props.actions.postMessage(this.roomKey, this.state.message)
      .then(() => toastr.success('Message posted successfully'))
      .then(() => {
        this.setState(Object.assign({}, this.initialState));
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  leaveRoom() {
    this.props.actions.leaveRoom(this.roomKey);
  }

  render() {
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

        <ChatMessageForm
          message={this.state.message}
          onChange={this.updateMessage}
          onSave={this.postMessage}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

ChatRoomPage.propTypes = {
  actions: PropTypes.object.isRequired,
  params: PropTypes.shape({
    roomKey: PropTypes.string.isRequired
  }).isRequired
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({listenToMessages, listenToUsers, postMessage, leaveRoom}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);
