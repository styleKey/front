import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryTableRow from './CategoryTableRow';
import CategoryTable from './CategoryTable';
import ItemTable from '../Item/ItemTable'; // Import the ItemTable component

function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/admin/category/${id}`)
      .then(response => response.json())
      .then(data => {
        setCategory(data.category);
        setItems(data.item);
      });
  }, [id]);

  return (
    <div>
      <h2>category</h2>
      <table>
        <thead>
          <CategoryTableRow />
        </thead>
        <tbody>
          <CategoryTable category={category} />
        </tbody>
      </table>

      <h2>items</h2>
      <table>
        <thead>
          <ItemTable />
        </thead>
        <tbody>
          {items.map(item => (
            <ItemTable key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryDetail;
