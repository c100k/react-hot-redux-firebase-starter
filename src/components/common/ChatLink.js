import React from 'react';
import {Link} from 'react-router';

const ChatLink = () => {
  return (
    <span>
      {" | "}
      <Link to="/chat" activeClassName="active">Chat</Link>
    </span>
  );
};

export default ChatLink;
