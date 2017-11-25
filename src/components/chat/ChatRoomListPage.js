import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {listenToRooms} from '../../actions/chatActions';

export class ChatRoomListPage extends React.Component {
  constructor(props) {
    super(props);

    this.props.actions.listenToRooms();
  }

  render() {
    return (
      <div className="chat">
        <h1>Chat Rooms</h1>

        <div className="list-group">
          {this.props.rooms.map(room => (
            <Link to={`/chat/${room.key}`} className="list-group-item" key={room.key}>
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
    actions: bindActionCreators({listenToRooms}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomListPage);
