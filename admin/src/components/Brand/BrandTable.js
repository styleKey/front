import React from 'react';
import { Link } from 'react-router-dom';

function BrandTable({ brand }) {
  return (
    <tr>
      <td>{brand.createdAt}</td>
      <td>{brand.updatedAt}</td>
      <td>{brand.id}</td>
      <td><Link to={`/brand/${brand.id}`} className="btn btn-title">{brand.title}</Link></td>
      <td>{brand.title_eng}</td>
      <td>{brand.description}</td>
      <td><a href={brand.site_url}>{brand.site_url}</a></td>
      <td><img src={brand.image} alt={brand.title} /></td>
      <td> <Link to={`/brand/${brand.id}/edit`} className="btn btn-edit">edit</Link></td>
      <td> <Link to={`/brand/${brand.id}/delete`} className="btn btn-delete">delete</Link></td>
    </tr>
  );
}

export default BrandTable;
