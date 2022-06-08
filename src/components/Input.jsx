import React from 'react';
import PropTypes from 'prop-types';

function Input({ type, placeholder, onChange, dataTestId }) {
  return (
    <div>
      <input
        type={ type }
        placeholder={ placeholder }
        onChange={ onChange }
        data-testid={ dataTestId }
      />
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
};

export default Input;
