import React, { useContext } from 'react';
import Context from '../context/Context';
import Input from './Input';
import Select from './Select';

function Table() {
  const {
    tableColumns,
    filteredPlanets,
    setFilterByName,
    setFilterByNumericValues,
    handleFilterByNumericValues,
  } = useContext(Context);

  const columOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  const comparisonOptions = ['maior que', 'menor que', 'igual a'];
  return (
    <div>
      <Input
        type="text"
        placeholder="Search..."
        onChange={ ({ target }) => setFilterByName({ name: target.value }) }
        dataTestId="name-filter"
      />
      <Select
        options={ columOptions }
        labelName="Coluna"
        selectId="column-filter"
        testId="column-filter"
        onChange={ ({ target }) => setFilterByNumericValues((state) => ({
          ...state,
          column: target.value,
        })) }
      />
      <Select
        options={ comparisonOptions }
        labelName="Operador"
        selectId="comparison-filter"
        testId="comparison-filter"
        onChange={ ({ target }) => setFilterByNumericValues((state) => ({
          ...state,
          comparison: target.value,
        })) }
      />
      <Input
        type="number"
        placeholder="População"
        onChange={ ({ target }) => setFilterByNumericValues((state) => ({
          ...state,
          value: target.value,
        })) }
        dataTestId="value-filter"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilterByNumericValues }
      >
        Filtrar
      </button>
      <table>
        <thead>
          <tr>
            {tableColumns.map((column, index) => (
              <th key={ index }>{column.toUpperCase().replace('_', ' ')}</th>
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
