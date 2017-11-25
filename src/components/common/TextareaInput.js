import React, {PropTypes} from 'react';

const TextareaInput = ({name, label, onChange, placeholder, value, required, error}) => {
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <textarea
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          required={required}
          onChange={onChange}>
        </textarea>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

TextareaInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string
};

export default TextareaInput;
