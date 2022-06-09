import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import Input from './Input';
import Select from './Select';

function Table() {
  const INITIAL_OPTIONS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [columnOptions, setColumnOptions] = useState(INITIAL_OPTIONS);

  const {
    tableColumns,
    filteredPlanets,
    setFilterByName,
    setFilterByNumericValues,
    filterByNumericValues,
  } = useContext(Context);

  const comparisonOptions = ['maior que', 'menor que', 'igual a'];

  const handleNumericFilter = () => {
    const numericFilter = {
      column,
      comparison,
      value,
    };
    setColumnOptions(
      columnOptions.filter((option) => option !== column),
    );

    setFilterByNumericValues([...filterByNumericValues, numericFilter]);
  };

  const deleteFilter = (columnName) => {
    const newFilters = filterByNumericValues
      .filter((filter) => filter.column !== columnName);
    setFilterByNumericValues(newFilters);

    setColumnOptions([...columnOptions, columnName]);
  };

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setColumnOptions(INITIAL_OPTIONS);
  };

  return (
    <div>
      <form>
        <Input
          type="text"
          placeholder="Search..."
          onChange={ ({ target }) => setFilterByName({ name: target.value }) }
          dataTestId="name-filter"
        />
        <Select
          options={ columnOptions }
          labelName="Coluna"
          selectId="column-filter"
          testId="column-filter"
          onChange={ ({ target }) => setColumn(target.value) }
        />
        <Select
          options={ comparisonOptions }
          labelName="Operador"
          selectId="comparison-filter"
          testId="comparison-filter"
          onChange={ ({ target }) => setComparison(target.value) }
        />
        <Input
          type="number"
          placeholder="0"
          onChange={ ({ target }) => setValue(target.value) }
          dataTestId="value-filter"
          value={ value }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleNumericFilter }
        >
          Filtrar
        </button>

        {filterByNumericValues.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
            <button type="button" onClick={ () => deleteFilter(filter.column) }>
              X
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={ removeAllFilters }
          data-testid="button-remove-filters"
        >
          Remover filtros
        </button>
      </form>
      <table>
        <thead>
          <tr>
            {tableColumns.map((columnTitle, index) => (
              <th key={ index }>{columnTitle.toUpperCase().replace('_', ' ')}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>
                {planet.films.map((film) => (
                  <span key={ film }>
                    <a href={ film }>{film}</a>
                  </span>
                ))}
              </td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>
                <a href={ planet.url }>{planet.url}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
