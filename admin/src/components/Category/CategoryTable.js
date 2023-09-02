import React from 'react';
import { Link } from 'react-router-dom';

function CategoryTable({ category }) {
  return (
    <tr>
      <td>{category.id}</td>
      <td><Link to={`/admin/coordiLook/${category.id}`} className="btn btn-primary">{category.title}</Link></td>
    </tr>
  );
}

export default CategoryTable;
