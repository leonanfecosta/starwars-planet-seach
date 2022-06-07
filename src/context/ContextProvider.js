import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  useEffect(() => {
    const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getData = async () => {
      const response = await fetch(URL);
      const planets = await response.json();
      setData(planets.results);
      setTableColumns(Object.keys(planets.results[0])
        .filter((key) => key !== 'residents'));
    };
    getData();
  }, []);

  const contextValue = {
    data,
    tableColumns,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
