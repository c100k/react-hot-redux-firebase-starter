import React from 'react';
import TextareaInput from '../common/TextareaInput';

const ChatMessageForm = ({message, onSave, onChange, saving}) => {
  return (
    <form onSubmit={onSave}>
      <TextareaInput
        name="message"
        label="Message"
        onChange={onChange}
        value={message}
        required
        />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Posting...' : 'Post'}
        className="btn btn-primary"
        />
    </form>
  );
};

ChatMessageForm.propTypes = {
  message: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool
};

export default ChatMessageForm;
