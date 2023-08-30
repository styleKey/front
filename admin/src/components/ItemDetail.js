import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemTable from './ItemTable';
import BrandTable from './BrandTable';
import CoordiLookTable from './CoordiLookTable';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [brand, setBrand] = useState([]);
  const [coordiLook, setCoordiLook] = useState([]);

  useEffect(() => {
    fetch(`/admin/item/${id}`)
      .then(response => response.json())
      .then(data => {
        setItem(data);
        setBrand(data.brand);
        setCoordiLook(data.coordilook);
      });
  }, [id]);

  return (
    <div>
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
          <ItemTable key={item.id} item={item} />
        </tbody>
      </table>

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

      <h2>coordilook</h2>
      <table>
        <thead>
          <tr>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>id</th>
            <th>title</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
            <CoordiLookTable key={coordiLook.id} coordiLook={coordiLook} />
        </tbody>
      </table>

    </div>
  );
}

export default ItemDetail;
