import React, { useContext, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Context from '../context/Context';
import Input from './Input';
import Select from './Select';
import InputRadio from './InputRadio';
import styles from '../styles/Table.module.css';
import logo from '../assets/images/star-wars-4.svg';

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
    filterByName,
    setOrderColumn,
    setOrdernation,
    changeOrder,
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
    <div className={ styles.main }>
      <img src={ logo } alt="starW=wars-logo" />

      <div className={ styles.mainContent }>
        <Input
          type="text"
          placeholder="Search planets"
          onChange={ ({ target }) => setFilterByName({ name: target.value }) }
          dataTestId="name-filter"
          name="search"
          labelContent=""
          value={ filterByName.name }
          id="name-filter"
        />

        <div>
          <span>ordernar por  </span>
          <Select
            options={ INITIAL_OPTIONS }
            testId="column-sort"
            selectId="column-sort"
            onChange={ ({ target }) => setOrderColumn(target.value) }
          />
        </div>

        <InputRadio
          type="radio"
          id="asc"
          name="order"
          value="ASC"
          onChange={ () => setOrdernation('ASC') }
          dataTestId="column-sort-input-asc"
          labelContent="Ascedente"
        />

        <InputRadio
          type="radio"
          id="desc"
          name="order"
          value="DESC"
          onChange={ () => setOrdernation('DESC') }
          dataTestId="column-sort-input-desc"
          labelContent="Descedente"
        />

        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ changeOrder }
        >
          Ordernar
        </button>
      </div>
      <form className={ styles.form }>
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
          id="value-filter"
          labelContent=""
          name="value"

        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleNumericFilter }
        >
          Filtrar
        </button>

        <button
          type="button"
          onClick={ removeAllFilters }
          data-testid="button-remove-filters"
        >
          Remover filtros
        </button>
      </form>
      <div className={ styles.filterContent }>
        {filterByNumericValues.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <p>{`${filter.column} ${filter.comparison} ${filter.value}`}</p>
            <button type="button" onClick={ () => deleteFilter(filter.column) }>
              <FaTrash className={ styles.btnIcon } />
            </button>
          </div>
        ))}
      </div>
      <table className={ styles.table }>
        <thead className={ styles.tableHead }>
          <tr>
            {tableColumns.map((columnTitle, index) => (
              <th key={ index }>{columnTitle.toUpperCase().replace('_', ' ')}</th>
            ))}
          </tr>
        </thead>
        <tbody className={ styles.tableBody }>
          {filteredPlanets.map((planet, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
