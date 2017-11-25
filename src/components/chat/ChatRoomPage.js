import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import {listMessages, postMessage} from '../../actions/chatActions';
import ChatMessageForm from './ChatMessageForm';

export class ChatRoomPage extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      message: '',
      saving: false
    };

    this.state = Object.assign({}, this.initialState);

    this.updateMessage = this.updateMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  componentWillMount() {
    this.props.actions.listMessages();
  }

  updateMessage(event) {
    this.setState({message: event.target.value});
  }

  postMessage(event) {
    event.preventDefault();

    this.setState({saving: true});

    this.props.actions.postMessage(this.state.message)
      .then(() => toastr.success('Message posted successfully'))
      .then(() => {
        this.setState(Object.assign({}, this.initialState));
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  render() {
    return (
      <div className="chat">
        <h1>Chat Room</h1>

        {this.props.messages.map(message => (
          <div className="message" key={message.key}>
            <div className="author">{message.val.authorUID}</div>
            <div className="message">{message.val.message}</div>
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
  messages: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string.isRequired
  })).isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    messages: state.chat.messages
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({listMessages, postMessage}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);
