import React from 'react';
import { Link } from 'react-router-dom';

function ItemTable({ item }) {
  return (
    <tr>
      <td>{item.createdAt}</td>
      <td>{item.updatedAt}</td>
      <td>{item.id}</td>
      <td><Link to={`/item/${item.id}`} className="btn btn-title">{item.title}</Link></td>
      <td><a href={item.sales_link}>{item.sales_link}</a></td>
      <td><img src={item.image} alt={item.title} /></td>
    </tr>
  );
}

export default ItemTable;
