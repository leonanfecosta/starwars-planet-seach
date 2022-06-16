import React from 'react';
import PropTypes from 'prop-types';
import { GiPlanetCore } from 'react-icons/gi';
import styles from '../styles/Table.module.css';

function Input({
  onChange,
  dataTestId,
  value,
  id,
  labelContent,
  name,
}) {
  return (
    <label htmlFor={ id } className={ styles.inputRadio }>
      {labelContent}
      <input
        type="radio"
        onChange={ onChange }
        data-testid={ dataTestId }
        value={ value }
        id={ id }
        name={ name }
      />
      <GiPlanetCore className={ styles.inputRadioIcon } />
    </label>
  );
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  id: PropTypes.string.isRequired,
  labelContent: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
