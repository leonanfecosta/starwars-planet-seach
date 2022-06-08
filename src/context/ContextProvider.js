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
      setTableColumns(
        Object.keys(planets.results[0]).filter((key) => key !== 'residents'),
      );
    };
    getData();
  }, []);

  useEffect(() => {
    if (filterByName.name !== '') {
      const filtered = data.filter((planet) => planet.name.toLowerCase()
        .includes(filterByName.name.toLowerCase()));
      setFilteredPlanets(filtered);
    } else {
      setFilteredPlanets(data);
    }
  }, [data, filterByName]);

  const handleFilterByNumericValues = () => {
    if (filterByNumericValues.comparison === 'maior que') {
      setFilteredPlanets(
        data.filter(
          (planet) => Number(planet[filterByNumericValues.column])
            > Number(filterByNumericValues.value),
        ),
      );
    } else if (filterByNumericValues.comparison === 'menor que') {
      setFilteredPlanets(
        data.filter(
          (planet) => Number(planet[filterByNumericValues.column])
            < Number(filterByNumericValues.value),
        ),
      );
    } else if (filterByNumericValues.comparison === 'igual a') {
      setFilteredPlanets(
        data.filter(
          (planet) => Number(planet[filterByNumericValues.column])
            === Number(filterByNumericValues.value),
        ),
      );
    }
  };

  const contextValue = {
    data,
    tableColumns,
    setFilterByName,
    filteredPlanets,
    setFilterByNumericValues,
    handleFilterByNumericValues,
  };

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
