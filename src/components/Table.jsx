import React, { useContext } from 'react';
import Context from '../context/Context';

function Table() {
  const { tableColumns, data } = useContext(Context);
  return (
    <table>
      <thead>
        <tr>
          {tableColumns.map((column, index) => (
            <th key={ index }>{column.toUpperCase().replace('_', ' ')}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((planet, index) => (
          <tr key={ index }>
            <td>{planet.name}</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>
              { planet.films.map((film) => (
                <span key={ film }><a href={ film }>{ film }</a></span>
              ))}
            </td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td className="td-planetUrl">
              <a href={ planet.url }>{ planet.url }</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
