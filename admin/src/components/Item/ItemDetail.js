import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemTableRow from './ItemTableRow';
import ItemTable from './ItemTable';
import BrandTableRow from '../Brand/BrandTableRow';
import BrandTable from '../Brand/BrandTable';
import CoordiLookTableRow from '../CoordiLook/CoordiLookTableRow';
import CoordiLookTable from '../CoordiLook/CoordiLookTable';

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
      <h2>item</h2>
      <table>
        <thead>
          <ItemTableRow />
        </thead>
        <tbody>
          <ItemTable key={item.id} item={item} />
        </tbody>
      </table>

      <h2>brand</h2>
      <table>
        <thead>
          <BrandTableRow />
        </thead>
        <tbody>
          <BrandTable key={brand.id} brand={brand} />
        </tbody>
      </table>

      <h2>coordilook</h2>
      <table>
        <thead>
          <CoordiLookTableRow />
        </thead>
        <tbody>
          <CoordiLookTable key={coordiLook.id} coordiLook={coordiLook} />
        </tbody>
      </table>

    </div>
  );
}

export default ItemDetail;
