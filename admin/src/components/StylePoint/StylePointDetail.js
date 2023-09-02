import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StylePointTableRow from './StylePointTableRow';
import StylePointTable from './StylePointTable';
import BrandTableRow from '../Brand/BrandTableRow';
import BrandTable from '../Brand/BrandTable';
import CoordiLookTableRow from '../CoordiLook/CoordiLookTableRow';
import CoordiLookTable from '../CoordiLook/CoordiLookTable';

function StylePointDetail() {
  const { id } = useParams();
  const [stylePoint, setStylePoint] = useState({});
  const [brands, setBrands] = useState([]);
  const [coordiLooks, setCoordiLooks] = useState([]);

  useEffect(() => {
    fetch(`/admin/stylepoint/${id}`)
      .then(response => response.json())
      .then(data => {
        setStylePoint(data.stylePoint);
        setBrands(data.brands);
        setCoordiLooks(data.coordilooks);
      });
  }, [id]);

  return (
    <div >
      <h2>stylePoint</h2>
      <table>
        <thead>
          <StylePointTableRow />
        </thead>
        <tbody>
          <StylePointTable key={stylePoint.id} stylePoint={stylePoint} />
        </tbody>
      </table>

      <h2>brands</h2>
      <table>
        <thead>
          <BrandTableRow />
        </thead>
        <tbody>
          {brands.map((brand) => (
            <BrandTable key={brand.id} brand={brand} />
          ))}
        </tbody>
      </table>

      <h2>coordilooks</h2>
      <table>
        <thead>
          <CoordiLookTableRow />
        </thead>
        <tbody>
          {coordiLooks.map(coordiLook => (
            <CoordiLookTable key={coordiLook.id} coordiLook={coordiLook} />
          ))}
        </tbody>
      </table>
    </div >
  );
}

export default StylePointDetail;
