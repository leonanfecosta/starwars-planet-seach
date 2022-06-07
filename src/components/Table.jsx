import React, { useContext } from 'react';
import Context from '../context/Context';
import Input from './Input';

function Table() {
  const { tableColumns, filteredPlanets } = useContext(Context);
  return (
    <div>
      <Input />
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
                  <span key={ film }><a href={ film }>{film}</a></span>
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
