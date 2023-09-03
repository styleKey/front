import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <Link to={`/coordilook/create`} className="btn btn-create">create</Link>
      <table>
        <thead>
          <CoordiLookTableRow />
        </thead>
        <tbody>
          {coordiLooks && coordiLooks.map((coordiLook) => (
            <CoordiLookTable key={coordiLook.id} coordiLook={coordiLook} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CoordiLookList;
