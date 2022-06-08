import React from 'react';
import PropTypes from 'prop-types';

function Select({ options, labelName, selectId, testId, onChange }) {
  return (
    <div>
      <label htmlFor={ selectId }>{ labelName }</label>
      <select id={ selectId } data-testid={ testId } onChange={ onChange }>
        { options.map((option, index) => (
          <option key={ index } value={ option }>
            { option }
          </option>
        )) }
      </select>
    </div>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  labelName: PropTypes.string.isRequired,
  selectId: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
