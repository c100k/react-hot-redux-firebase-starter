import React, {PropTypes} from 'react';
import {connect} from 'react-redux';

class ChatRoomUsersWidget extends React.Component {
  render() {
    return (
      <div>
        {this.props.users.map(user => (
          <div className="user" key={user.key}>
            <i className="glyphicon glyphicon-user" /><br/>
            {user.key}
          </div>
        ))}
      </div>
    );
  }
}

ChatRoomUsersWidget.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired
  })).isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    users: state.chat.users
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoomUsersWidget);
