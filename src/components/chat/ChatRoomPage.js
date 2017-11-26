import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import {listenToMessages, listenToUsers, postMessage, leaveRoom} from '../../actions/chatActions';
import ChatMessageForm from './ChatMessageForm';

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

        {this.props.users.map(user => (
          <div className="user" key={user.key}>
            <i className="glyphicon glyphicon-user" /><br/>
            {user.key}
          </div>
        ))}

        {this.props.messages.map(message => (
          <div className="message" key={message.key}>
            <div className="author">{message.val.authorUID}</div>
            <div className={`${this.props.currentUserUID === message.val.authorUID ? 'current-user-message' : ''} message`}>
              {message.val.message}
            </div>
          </div>
        ))}

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
  currentUserUID: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    val: PropTypes.shape({
      authorUID: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    }).isRequired
  })).isRequired,
  params: PropTypes.shape({
    roomKey: PropTypes.string.isRequired
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired
  })).isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    currentUserUID: state.auth.currentUserUID,
    messages: state.chat.messages,
    users: state.chat.users
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({listenToMessages, listenToUsers, postMessage, leaveRoom}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);
