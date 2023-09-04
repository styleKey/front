import React, { useState, useEffect } from 'react';
import getData from '../../api/getData';

import { BrandTableMap } from './BrandTable';

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('brands');
      if (data) {
        setBrands(data.content);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <BrandTableMap brands={brands} />
    </div>
  );
}

export default BrandList;