import React from 'react';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../formatTimestamp';

function BrandTableRow() {
  return (
    <tr>
      <th>id</th>
      <th>title</th>
      <th>title_eng</th>
      <th>description</th>
      <th>site_url</th>
      <th>image</th>
      <th>createdAt</th>
      <th>updatedAt</th>
      <th>edit</th>
      <th>delete</th>
    </tr>
  );
}

function BrandTable({ brand, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the brand "${brand.title}"?`)) {
      onDelete(brand.id);
    }
  };

  return (
    <tr>
      <td>{brand.id}</td>
      <td><Link to={`/brand/${brand.id}`} className="btn btn-title">{brand.title}</Link></td>
      <td>{brand.title_eng}</td>
      <td>{brand.description}</td>
      <td><a href={brand.site_url}>{brand.site_url}</a></td>
      <td><img src={brand.image} alt={brand.title} /></td>
      <td>{formatTimestamp(brand.createdAt)}</td>
      <td>{formatTimestamp(brand.updatedAt)}</td>
      <td><Link to={`/brand/${brand.id}/edit`} className="btn btn-edit">edit</Link></td>
      <td><button className="btn btn-delete" onClick={handleDelete}>delete</button></td>
    </tr >
  );
}

function BrandTableMap({ brands, onDelete }) {
  return (
    <div>
      <Link to={`/brand/create`} className="btn btn-create">create</Link>
      <table>
        <thead>
          <BrandTableRow />
        </thead>
        <tbody>
          {brands && brands.map((brand) => (
            <BrandTable key={brand.id} brand={brand} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}


function BrandTableSingle({ brand, onDelete }) {
  return (
    <div>
      <table>
        <thead>
          <BrandTableRow />
        </thead>
        <tbody>
          <BrandTable key={brand.id} brand={brand} onDelete={onDelete} />
        </tbody>
      </table>
    </div>
  );
}

export { BrandTableMap, BrandTableSingle };