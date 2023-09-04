import React, { useState, useEffect } from 'react';
import getData from '../../api/getData';

import { CoordiLookTableMap } from './CoordiLookTable';

function CoordiLookList() {
  const [coordiLooks, setCoordiLooks] = useState([]);

  useEffect(() => {
    const fetchCoordiLooks = async () => {
      const data = await getData('coordilooks');
      if (data) {
        setCoordiLooks(data.content);
      }
    };
    fetchCoordiLooks();
  }, []);

  return (
    <div>
      <CoordiLookTableMap coordiLooks={coordiLooks} />
    </div>
  );
}

export default CoordiLookList;
