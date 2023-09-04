import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';

import { BrandTableSingle } from './BrandTable';
import { ItemTableMap } from '../Item/ItemTable';

function BrandDetail() {
  const { id } = useParams();
  const [brand, setBrand] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`/brand/${id}`);
      if (data) {
        setBrand(data.brand);
        setItems(data.item);
      }
    };
    fetchData();
  }, [id]);


  return (
    <div>
      <div className="Main">
        <h1>{brand.title} brand</h1>
        <BrandTableSingle brand={brand} />
      </div>

      <div className="Sub">
        <h2>items</h2>
        <ItemTableMap items={items} />
      </div>
    </div>
  );
}

export default BrandDetail;
