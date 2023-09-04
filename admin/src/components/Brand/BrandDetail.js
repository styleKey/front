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
      const data = await getData(`/admin/brand/${id}`);
      if (data) {
        setBrand(data.brand);
        setItems(data.item);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <BrandTableSingle brand={brand} />
      <ItemTableMap items={items} />
    </div>
  );
}

export default BrandDetail;
