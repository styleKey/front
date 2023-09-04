import React from 'react';
import { Link } from 'react-router-dom';

function CategoryTableRow() {
  return (
    <tr>
      <th>id</th>
      <th>title</th>
      <th>edit</th>
    </tr>
  );
}

function CategoryTable({ category }) {
  return (
    <tr>
      <td>{category.id}</td>
      <td><Link to={`/category/${category.id}`} className="btn btn-title">{category.title}</Link></td>
    </tr>
  );
}

function CategoryTableMap({ categories }) {
  return (
    <div>
      <h2>Categories</h2>
      <table>
        <thead>
          <CategoryTableRow />
        </thead>
        <tbody>
          {categories && categories.map(category => (
            <CategoryTable key={category.id} category={category} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CategoryTableSingle({ category }) {
  return (
    <div>
      <h2>{category.title} Category</h2>
      <table>
        <thead>
          <CategoryTableRow />
        </thead>
        <tbody>
          <CategoryTable key={category.id} category={category} />
        </tbody>
      </table>
    </div>
  );
}

export { CategoryTableMap, CategoryTableSingle };
