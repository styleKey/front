import React from 'react';
import { Link } from 'react-router-dom';

function ItemTable({ item }) {
  return (
     <div>
      <td>{item.createdAt}</td>
      <td>{item.updatedAt}</td>
      <td>{item.id}</td>
      <td><Link to={`/admin/item/${item.id}`} className="btn btn-primary">{item.title}</Link></td>
      <td>{item.description}</td>
      <td><a href={item.site_url}>{item.site_url}</a></td>
      <td><img src={item.image} alt={item.title} /></td>
    </div>
  );
}

export default ItemTable;
