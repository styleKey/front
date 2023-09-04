import React from 'react';

function StylePointTableRow() {
  return (
    <tr>
      <th>id</th>
      <th>title</th>
      <th>description</th>
      <th>image</th>
      <th>edit</th>
    </tr>
  );
}

function StylePointTable({ stylePoint }) {
  return (
    <tr>
      <td>{stylePoint.id}</td>
      <td>{stylePoint.title}</td>
      <td>{stylePoint.description}</td>
      <td><img src={stylePoint.image} alt={stylePoint.title} /></td>
      <td><a href={`/stylePoint/${stylePoint.id}/edit`} className="btn btn-edit">edit</a></td>
    </tr>
  );
}

function StylePointTableMap({ stylePoints }) {
  return (
    <div>
      <h2>stylepoints</h2>
      <table>
        <thead>
          <StylePointTableRow />
        </thead>
        <tbody>
          {stylePoints && stylePoints.map((stylePoint) => (
            <StylePointTable key={stylePoint.id} stylePoint={stylePoint} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StylePointTableSingle({ stylePoint }) {
  return (
    <div>
      <h2>{stylePoint.title} stylepoint</h2>
      <table>
        <thead>
          <StylePointTableRow />
        </thead>
        <tbody>
          <StylePointTable key={stylePoint.id} stylePoint={stylePoint} />
        </tbody>
      </table>
    </div>
  );
}

export { StylePointTableMap, StylePointTableSingle };
