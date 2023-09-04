import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';
import deleteData from '../../api/deleteData';

import { CategoryTableSingle } from './CategoryTable';
import { ItemTableMap } from '../Item/ItemTable';

function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`/category/${id}`);
      if (data) {
        setCategory(data.category);
        setItems(data.item);
      }
    };
    fetchData();
  }, [id]);

  const handleDelete = async (id) => {
    await deleteData('item', id);
    window.location.reload();
  };

  return (
    <div>
      <div className="Main">
        <h1>{category.title} category</h1>
        <CategoryTableSingle category={category} />
      </div>

      <div className="Sub">
        <h2>items</h2>
        <ItemTableMap items={items} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default CategoryDetail;
