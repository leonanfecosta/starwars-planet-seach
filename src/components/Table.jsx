import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import Input from './Input';
import Select from './Select';

function Table() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [columOptions, setColumOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

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
    setColumOptions(
      columOptions.filter((option) => option !== column),
    );

    setFilterByNumericValues([...filterByNumericValues, numericFilter]);
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
          options={ columOptions }
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

        <div>
          {filterByNumericValues.map((filter, index) => (
            <p key={ index }>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
          ))}
        </div>
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
