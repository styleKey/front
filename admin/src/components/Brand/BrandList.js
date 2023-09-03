import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import BrandTableRow from './BrandTableRow';
import BrandTable from './BrandTable';

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
      <Link to={`/brand/create`} className="btn btn-create">create</Link>
      <table>
        <thead>
          <BrandTableRow />
        </thead>
        <tbody>
          {brands && brands.map((brand) => (
            <BrandTable key={brand.id} brand={brand} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BrandList;