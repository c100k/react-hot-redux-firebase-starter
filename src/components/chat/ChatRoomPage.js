import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';

import {postMessage} from '../../actions/chatActions';
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
      <div>
        <h1>Chat Room</h1>
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
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({postMessage}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomPage);
