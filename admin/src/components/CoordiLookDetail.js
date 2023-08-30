import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CoordiLookTable from './CoordiLookTable';
import Item from './ItemTable';

function CoordiLookDetail() {
  const { id } = useParams();
  const [coordiLook, setCoordiLook] = useState({});
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(`/admin/coordilook/${id}`)
      .then(response => response.json())
      .then(data => {
        setCoordiLook(data.coordiLook);
        setItems(data.items);
      })
  }, [id]);

  return (
    <div>
      <h2>coordilooks</h2>
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
            <Item key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoordiLookDetail;
