import React from 'react';
import { Link } from 'react-router-dom';

function StylePointTable({ stylePoint }) {
  return (
    <tr>
      <td>{stylePoint.id}</td>
      <td><Link to={`/stylepoint/${stylePoint.id}`} className="btn btn-title">{stylePoint.title}</Link></td>
      <td>{stylePoint.description}</td>
      <td><img src={stylePoint.image} alt={stylePoint.title} /></td>
      <td> <Link to={`/stylePoint/${stylePoint.id}/edit`} className="btn btn-edit">edit</Link></td>
    </tr>
  );
}
export default StylePointTable;
