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
      <StylePointTableSingle stylePoint={stylePoint} />
      <BrandTableMap brands={brands} />
      <CoordiLookTableMap coordiLooks={coordiLooks} />
    </div >
  );
}

export default StylePointDetail;
