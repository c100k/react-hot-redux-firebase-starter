import React from 'react';
import TextInput from '../common/TextInput';

const ChatRoomForm = ({name, onSave, onChange, saving}) => {
  return (
    <form onSubmit={onSave}>
      <TextInput
        name="name"
        label="Name"
        onChange={onChange}
        value={name}
        required
        />

      <input
        type="submit"
        disabled={saving}
        value={saving ? 'Creating...' : 'Create'}
        className="btn btn-primary"
        />
    </form>
  );
};

ChatRoomForm.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSave: React.PropTypes.func.isRequired,
  saving: React.PropTypes.bool
};

export default ChatRoomForm;
