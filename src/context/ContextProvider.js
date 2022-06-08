import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  useEffect(() => {
    const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getData = async () => {
      const response = await fetch(URL);
      const planets = await response.json();
      setData(planets.results);
      setFilteredPlanets(planets);
      setTableColumns(
        Object.keys(planets.results[0]).filter((key) => key !== 'residents'),
      );
    };
    getData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((planet) => planet.name.toLowerCase()
      .includes(filterByName.name.toLowerCase()));
    const result = filterByNumericValues.reduce((acc, filter) => acc.filter((planet) => {
      switch (filter.comparison) {
      case 'maior que':
        return Number(planet[filter.column]) > Number(filter.value);
      case 'menor que':
        return Number(planet[filter.column]) < Number(filter.value);
      case 'igual a':
        return Number(planet[filter.column]) === Number(filter.value);
      default:
        return true;
      }
    }), filtered);

    setFilteredPlanets(result);
  }, [filterByName, filterByNumericValues, data]);

  const contextValue = {
    data,
    tableColumns,
    setFilterByName,
    filteredPlanets,
    setFilterByNumericValues,
    filterByNumericValues,
    filterByName,
  };

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
