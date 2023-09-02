import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CoordiLookTableRow from './CoordiLookTableRow';
import CoordiLookTable from './CoordiLookTable';
import ItemTableRow from '../Item/ItemTableRow';
import Item from '../Item/ItemTable';

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
      <h2>coordilook</h2>
      <table>
        <thead>
          <CoordiLookTableRow />
        </thead>
        <tbody>
          <CoordiLookTable key={coordiLook.id} coordiLook={coordiLook} />
        </tbody>
      </table>

      <h2>items</h2>
      <table>
        <thead>
          <ItemTableRow />
        </thead>
        <tbody>
          {items && items.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoordiLookDetail;
