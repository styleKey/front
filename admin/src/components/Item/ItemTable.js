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
      <td> <Link to={`/item/${item.id}/edit`} className="btn btn-edit">edit</Link></td>
      <td> <Link to={`/item/${item.id}/delete`} className="btn btn-delete">delete</Link></td>
    </tr>
  );
}

export default ItemTable;
