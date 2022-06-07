import React, { useContext } from 'react';
import Context from '../context/Context';

function Input() {
  const { setFilterByName } = useContext(Context);
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={ ({ target }) => setFilterByName({ name: target.value }) }
        data-testid="name-filter"
      />
    </div>
  );
}

export default Input;
