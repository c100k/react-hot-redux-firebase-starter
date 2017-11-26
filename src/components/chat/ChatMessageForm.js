import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {typeMessage, postMessage} from '../../actions/chatActions';
import TextareaInput from '../common/TextareaInput';

class ChatMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateMessage = this.updateMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }

  updateMessage(event) {
    this.props.actions.typeMessage(event.target.value);
  }

  postMessage(event) {
    event.preventDefault();
    this.props.actions.postMessage(this.props.roomKey, this.props.message);
  }

  render() {
    return (
      <form onSubmit={this.postMessage}>
        <TextareaInput
          name="message"
          label="Message"
          onChange={this.updateMessage}
          value={this.props.message}
          required
          />
  
        <input
          type="submit"
          disabled={this.props.postingMessage}
          value={this.props.postingMessage ? 'Posting...' : 'Post'}
          className="btn btn-primary"
          />
      </form>
    );
  }
}

ChatMessageForm.propTypes = {
  actions: React.PropTypes.object.isRequired,
  message: React.PropTypes.string.isRequired,
  postingMessage: React.PropTypes.bool.isRequired,
  roomKey: React.PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    message: state.chat.message,
    postingMessage: state.chat.postingMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({typeMessage, postMessage}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessageForm);
