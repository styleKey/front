import React from 'react';
import { Link } from 'react-router-dom';
import { formatTimestamp } from '../formatTimestamp';

function ItemTableRow() {
  return (
    <tr>
      <th>id</th>
      <th>title</th>
      <th>sales_link</th>
      <th>image</th>
      <th>edit</th>
      <th>delete</th>
      <th>createdAt</th>
      <th>updatedAt</th>
    </tr>
  );
}

function ItemTable({ item, onDelete }) {

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete this item? ${item.title}`)) {
      onDelete(item.id);
    }
  };

  return (
    <tr>
      <td>{item.id}</td>
      <td><a href={`/item/${item.id}`} className="btn btn-title">{item.title}</a></td>
      <td><a href={item.sales_link}>{item.sales_link}</a></td>
      <td><img src={item.image} alt={item.title} /></td>
      <td>{formatTimestamp(item.createdAt)}</td>
      <td>{formatTimestamp(item.updatedAt)}</td>
      <td><a href={`/item/${item.id}/edit`} className="btn btn-edit">edit</a></td>
      <td><button className="btn btn-delete" onClick={handleDelete}>delete</button></td>
    </tr>
  );
}

function ItemTableMap({ items, onDelete }) {
  return (
    <div>
      <Link to={`/item/create`} className="btn btn-create">create</Link>
      <table>
        <thead>
          <ItemTableRow />
        </thead>
        <tbody>
          {items && items.map(item => (
            <ItemTable key={item.id} item={item} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ItemTableSingle({ item, onDelete }) {
  return (
    <div>
      <table>
        <thead>
          <ItemTableRow />
        </thead>
        <tbody>
          <ItemTable key={item.id} item={item} onDelete={onDelete} />
        </tbody>
      </table>
    </div>
  );
}

export { ItemTableMap, ItemTableSingle };
