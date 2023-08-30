import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemTable from './ItemTable'; 

function ItemList({ coordiLookId }) {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/admin/items');
        setItems(response.data.content);
      } catch (error) {
        console.error('Error fetching items', error);
      }
    };
    fetchItems();
  }, []);


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
          {items.map(item => (
            <ItemTable key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
