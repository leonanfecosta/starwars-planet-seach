import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function ContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [orderColumn, setOrderColumn] = useState('population');
  const [ordernation, setOrdernation] = useState('ASC');
  const [order, setOrder] = useState({
    column: orderColumn,
    sort: ordernation,
  });

  useEffect(() => {
    const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
    const getData = async () => {
      const response = await fetch(URL);
      const { results } = await response.json();
      results.sort((a, b) => a.name.localeCompare(b.name));
      setData(results);
      setFilteredPlanets(results);
      setTableColumns(
        Object.keys(results[0]).filter((key) => key !== 'residents'),
      );
    };
    getData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((planet) => planet.name.toLowerCase()
      .includes(filterByName.name.toLowerCase()));
    const result = filterByNumericValues.reduce(
      (acc, filter) => acc.filter((planet) => {
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
      }),
      filtered,
    );

    setFilteredPlanets(result);
  }, [filterByName, filterByNumericValues, data]);

  const changeOrder = () => {
    setOrder({
      column: orderColumn,
      sort: ordernation,
    });
    switch (order.sort) {
    case 'ASC':
      return setFilteredPlanets(
        filteredPlanets.sort((a, b) => a[order.column] - b[order.column]),
      );
    case 'DESC':
      return setFilteredPlanets(
        filteredPlanets.sort((a, b) => b[order.column] - a[order.column]),
      );
    default:
      return true;
    }
  };

  useEffect(() => {
    setOrder({
      column: orderColumn,
      sort: ordernation,
    });
  }, [orderColumn, ordernation]);

  const contextValue = {
    data,
    tableColumns,
    setFilterByName,
    filteredPlanets,
    setFilterByNumericValues,
    filterByNumericValues,
    filterByName,
    setOrderColumn,
    setOrdernation,
    changeOrder,
  };

  return <Context.Provider value={ contextValue }>{children}</Context.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
