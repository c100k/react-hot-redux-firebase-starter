import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {createRoom, listenToRooms, joinRoom} from '../../actions/chatActions';
import ChatRoomForm from './ChatRoomForm';

export class ChatRoomListPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      saving: false,
    };

    this.props.actions.listenToRooms();

    this.create = this.create.bind(this);
    this.select = this.select.bind(this);
    this.updateRoomCreation = this.updateRoomCreation.bind(this);
  }

  create(event) {
    event.preventDefault();
    this.props.actions.createRoom(this.state.name);
  }

  select(event, room) {
    this.props.actions.joinRoom(room);
  }

  updateRoomCreation(event) {
    this.setState({name: event.target.value});
  }

  render() {
    return (
      <div className="chat">
        <h1>Chat Rooms</h1>

        <div className="panel">
          <ChatRoomForm
            name={this.state.name}
            onChange={this.updateRoomCreation}
            onSave={this.create}
            saving={this.state.saving}
          />
        </div>

        <div className="list-group">
          {this.props.rooms.map(room => (
            <Link
              to={`/chat/${room.key}`}
              className="list-group-item"
              key={room.key}
              onClick={e => this.select(e, room)} // eslint-disable-line react/jsx-no-bind
            >
              {room.val.name}
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

ChatRoomListPage.propTypes = {
  actions: PropTypes.object.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    val: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  })).isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    rooms: state.chat.rooms
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createRoom, listenToRooms, joinRoom}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomListPage);
