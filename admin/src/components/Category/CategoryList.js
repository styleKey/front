import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CategoryTableRow from './CategoryTableRow';
import CategoryTable from './CategoryTable';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/admin/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>categories</h2>
      <table>
        <thead>
          <CategoryTableRow />
        </thead>
        <tbody>
          {categories && categories.map(category => (
            <CategoryTable key={category.id} category={category} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
