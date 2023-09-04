import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';

import { ItemTableSingle } from '../Item/ItemTable';
import { BrandTableSingle } from '../Brand/BrandTable';
import { CoordiLookTableSingle } from '../CoordiLook/CoordiLookTable';
import { CategoryTableSingle } from '../Category/CategoryTable';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [brand, setBrand] = useState([]);
  const [coordiLook, setCoordiLook] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`item/${id}`);
      if (data) {
        setItem(data);
        setBrand(data.brand);
        setCoordiLook(data.coordilook);
        setCategory(data.category);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <div className="Main">
        <h1>{item.title} item</h1>
        <ItemTableSingle item={item} />
      </div>

      <div className="Sub">
        <h2>brand</h2>
        <BrandTableSingle brand={brand} />
      </div>
      <div className="Sub">
        <h2>coordiLook</h2>
        <CoordiLookTableSingle coordiLook={coordiLook} />
      </div>
      <div className="Sub">
        <h2>category</h2>
        <CategoryTableSingle category={category} />
      </div>
    </div>
  );
}

export default ItemDetail;
