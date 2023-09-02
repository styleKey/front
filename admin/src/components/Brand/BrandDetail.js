import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BrandTableRow from './BrandTableRow';
import BrandTable from './BrandTable';
import ItemTableRow from '../Item/ItemTableRow';
import ItemTable from '../Item/ItemTable';

function BrandDetail() {
  const { id } = useParams();
  const [brand, setBrand] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/admin/brand/${id}`)
      .then(response => response.json())
      .then(data => {
        setBrand(data.brand);
        setItems(data.item);
      });
  }, [id]);

  return (
    <div>
      <h2>brand</h2>
      <table>
        <thead>
          <BrandTableRow />
        </thead>
        <tbody>
          <BrandTable key={brand.id} brand={brand} />
        </tbody>
      </table>
      
      <h2>items</h2>
      <table>
        <thead>
          <ItemTableRow />
        </thead>
        <tbody>
          {items.map(item => (
            <ItemTable key={item.id} item={item} />
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default BrandDetail;
