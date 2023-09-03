import React from 'react';
import { Link } from 'react-router-dom';

function BrandTable({ brand, onDelete }) {

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this brand? ${brand.title}`)) {
      onDelete(brand.id); 
    }
  };

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
      <td><Link to={`/brand/${brand.id}/edit`} className="btn btn-edit">edit</Link></td>
      <td><button className="btn btn-delete" onClick={handleDelete}>delete</button></td>
    </tr>
  );
}

export default BrandTable;
