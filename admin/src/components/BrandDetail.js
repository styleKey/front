import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BrandTable from './BrandTable';
import ItemTable from './ItemTable'; 

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
          <BrandTable key={brand.id} brand={brand} />
        </tbody>
      </table>

      <h2>items</h2>
      <table>
        <thead>
          <tr>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>id</th>
            <th>title</th>
            <th>site_url</th>
            <th>image</th>
          </tr>
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
