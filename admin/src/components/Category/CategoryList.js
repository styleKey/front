import React, { useState, useEffect } from 'react';
import getData from '../../api/getData';

import { CategoryTableMap } from './CategoryTable';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getData('categories');
      if (data) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <CategoryTableMap categories={categories} />
    </div>
  );
};

export default CategoryList;
