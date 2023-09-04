import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';

import { CategoryTableSingle } from './CategoryTable';
import { ItemTableMap } from '../Item/ItemTable';

function CategoryDetail() {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`/admin/category/${id}`);
      if (data) {
        setCategory(data.category);
        setItems(data.item);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <CategoryTableSingle category={category} />
      <ItemTableMap items={items} />
    </div>
  );
}

export default CategoryDetail;
