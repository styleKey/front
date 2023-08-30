import React from 'react';
import { Link } from 'react-router-dom';

function BrandTable({ brand }) {
  return (
    <div>
      <td>{brand.createdAt}</td>
      <td>{brand.updatedAt}</td>
      <td>{brand.id}</td>
      <td><Link to={`/admin/brand/${brand.id}`} className="btn btn-primary">{brand.title}</Link></td>
      <td>{brand.title_eng}</td>
      <td>{brand.description}</td>
      <td><a href={brand.site_url}>{brand.site_url}</a></td>
      <td><img src={brand.image} alt={brand.title} /></td>
    </div>
  );
}

export default BrandTable;
