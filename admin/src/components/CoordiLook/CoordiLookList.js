import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CoordiLookTableRow from './CoordiLookTableRow';
import CoordiLookTable from './CoordiLookTable';

function CoordiLookList() {
  const [coordiLooks, setCoordiLooks] = useState([]);

  useEffect(() => {
    const fetchCoordiLooks = async () => {
      try {
        const response = await axios.get('/admin/coordilooks');
        setCoordiLooks(response.data.content);
      } catch (error) {
        console.error('Error fetching coordilooks:', error);
      }
    };
    fetchCoordiLooks();
  }, []);


  return (
    <div>
      <h2>coordilooks</h2>
      <table>
        <thead>
          <CoordiLookTableRow />
        </thead>
        <tbody>
          {coordiLooks.map((coordiLook) => (
            <CoordiLookTable key={coordiLook.id} coordiLook={coordiLook} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoordiLookList;
