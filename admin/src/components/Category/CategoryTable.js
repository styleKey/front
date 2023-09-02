import React from 'react';
import { Link } from 'react-router-dom';

function CategoryTable({ category }) {
  return (
    <tr>
      <td>{category.id}</td>
      <td><Link to={`/category/${category.id}`} className="btn btn-title">{category.title}</Link></td>
    </tr>
  );
}

export default CategoryTable;
