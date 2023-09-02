import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemTableRow from './ItemTableRow';
import ItemTable from './ItemTable';
import BrandTableRow from '../Brand/BrandTableRow';
import BrandTable from '../Brand/BrandTable';
import CoordiLookTableRow from '../CoordiLook/CoordiLookTableRow';
import CoordiLookTable from '../CoordiLook/CoordiLookTable';
import CategoryTableRow from '../Category/CategoryTableRow';
import CategoryTable from '../Category/CategoryTable';


function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [brand, setBrand] = useState([]);
  const [coordiLook, setCoordiLook] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    fetch(`/admin/item/${id}`)
      .then(response => response.json())
      .then(data => {
        setItem(data);
        setBrand(data.brand);
        setCoordiLook(data.coordilook);
        setCategory(data.category);
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
      
      <h2>category</h2>
      <table>
        <thead>
          <CategoryTableRow />
        </thead>
        <tbody>
          <CategoryTable key={category.id} category={category} />
        </tbody>
      </table>
    </div>
  );
}

export default ItemDetail;
