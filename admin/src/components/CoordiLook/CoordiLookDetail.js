import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';

import { CoordiLookTableSingle } from './CoordiLookTable';
import { ItemTableMap } from '../Item/ItemTable';

function CoordiLookDetail() {
  const { id } = useParams();
  const [coordiLook, setCoordiLook] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`/admin/coordilook/${id}`);
      if (data) {
        setCoordiLook(data.coordiLook);
        setItems(data.items);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <CoordiLookTableSingle coordiLook={coordiLook} />
      <ItemTableMap items={items} />
    </div>
  );
}

export default CoordiLookDetail;
