import React from 'react';
import { Link } from 'react-router-dom';

function StylePointTable({ stylePoint }) {
  return (
    <div>
      <td>{stylePoint.id}</td>
      <td><Link to={`/admin/stylepoint/${stylePoint.id}`} className="btn btn-primary">{stylePoint.title}</Link></td>
      <td>{stylePoint.description}</td>
      <td><img src={stylePoint.image} alt={stylePoint.title} /></td>
    </div>
  );
}
export default StylePointTable;
