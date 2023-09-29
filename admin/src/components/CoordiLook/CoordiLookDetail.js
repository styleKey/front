import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';
import deleteData from '../../api/deleteData';

import { CoordiLookTableSingle } from './CoordiLookTable';
import { ItemTableMap } from '../Item/ItemTable';

function CoordiLookDetail() {
  const { id } = useParams();
  const [coordiLook, setCoordiLook] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`/coordilook/${id}`);
      if (data) {
        setCoordiLook(data.coordiLook);
        setItems(data.items);
      }
    };
    fetchData();
  }, [id]);

  const handleDeleteoordiLoo = async (id) => {
    await deleteData('coordiLook', id);
    window.location.reload();
  };

  const handleDeleteitem = async (id) => {
    await deleteData('item', id);
    window.location.reload();
  };


  return (
    <div>
      <div className="Main">
        <h1>{coordiLook.title} coordiLook</h1>
        <CoordiLookTableSingle coordiLook={coordiLook} onDelete={handleDeleteoordiLoo} />
      </div>

      <div className="Sub">
        <h2>items</h2>
        <ItemTableMap items={items} onDelete={handleDeleteitem} />
      </div>
    </div>
  );
}

export default CoordiLookDetail;
