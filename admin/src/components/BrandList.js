import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BrandItem from './BrandTable';

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('/admin/brands');
        setBrands(response.data.content);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div>
      <h2>brands</h2>
      <table>
        <thead>
          <tr>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>id</th>
            <th>title</th>
            <th>title_eng</th>
            <th>site_url</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand) => (
            <BrandItem key={brand.id} brand={brand} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandList;
