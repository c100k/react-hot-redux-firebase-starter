import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class ChatRoomMessagesWidget extends React.Component {
  render() {
    return (
      <div>
        {this.props.messages.map(message => (
          <div className="message" key={message.key}>
            <div className="author">{message.val.authorUID}</div>
            <div className={`${this.props.currentUserUID === message.val.authorUID ? 'current-user-message' : ''} message`}>
              {message.val.message}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

ChatRoomMessagesWidget.propTypes = {
  currentUserUID: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    val: PropTypes.shape({
      authorUID: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired
    }).isRequired
  })).isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    currentUserUID: state.auth.currentUserUID,
    messages: state.chat.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomMessagesWidget);
