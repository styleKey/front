import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';

import { StylePointTableSingle } from './StylePointTable';
import { BrandTableMap } from '../Brand/BrandTable';
import { CoordiLookTableMap } from '../CoordiLook/CoordiLookTable';

function StylePointDetail() {
  const { id } = useParams();
  const [stylePoint, setStylePoint] = useState({});
  const [brands, setBrands] = useState([]);
  const [coordiLooks, setCoordiLooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(`stylepoint/${id}`);
      if (data) {
        setStylePoint(data.stylePoint);
        setBrands(data.brands);
        setCoordiLooks(data.coordilooks);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div >
      <div className="Main">
        <h1>{stylePoint.title} stylepoint</h1>
        <StylePointTableSingle stylePoint={stylePoint} />
      </div>

      <div className="Sub">
        <h2>brands</h2>
        <BrandTableMap brands={brands} />
      </div>

      <div className="Sub">
        <h2>coordiLooks</h2>
        <CoordiLookTableMap coordiLooks={coordiLooks} />
      </div>
    </div >
  );
}

export default StylePointDetail;
