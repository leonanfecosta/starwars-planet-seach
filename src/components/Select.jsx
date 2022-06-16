import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Table.module.css';

function Select({ options, selectId, testId, onChange }) {
  return (
    <select
      id={ selectId }
      data-testid={ testId }
      onChange={ onChange }
      className={ styles.Select }
    >
      {options.map((option, index) => (
        <option key={ index } value={ option }>
          {option}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectId: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
