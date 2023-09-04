import React, { useState, useEffect } from 'react';
import getData from '../../api/getData';
import { ItemTableMap } from '../Item/ItemTable';

function ItemList({ coordiLookId }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('items');
      if (data) {
        setItems(data.content);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <ItemTableMap items={items} />
    </div>
  );
}

export default ItemList;
