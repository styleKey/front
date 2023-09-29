import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';
import deleteData from '../../api/deleteData';

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

  const handleDeletebrand = async (id) => {
    await deleteData('brand', id);
    window.location.reload();
  };

  const handleDeleteitem = async (id) => {
    await deleteData('item', id);
    window.location.reload();
  };

  return (
    <div>
      <div className="Main">
        <h1>{brand.title} brand</h1>
        <BrandTableSingle brand={brand} onDelete={handleDeletebrand} />
      </div>

      <div className="Sub">
        <h2>items</h2>
        <ItemTableMap items={items} onDelete={handleDeleteitem} />
      </div>
    </div>
  );
}

export default BrandDetail;
