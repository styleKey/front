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
      <ItemTableSingle item={item} />
      <BrandTableSingle brand={brand} />
      <CoordiLookTableSingle coordiLook={coordiLook} />
      <CategoryTableSingle category={category} />
    </div>
  );
}

export default ItemDetail;
