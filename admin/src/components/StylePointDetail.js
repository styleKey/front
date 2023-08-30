import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StylePointTable from './StylePointTable';
import BrandTable from './BrandTable';
import CoordiLookTable from './CoordiLookTable';

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
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>image</th>
          </tr>
        </thead>
        <tbody>
          <StylePointTable key={stylePoint.id} stylePoint={stylePoint} />
        </tbody>
      </table>

      <h2>brands</h2>
      <table>
        <thead>
          <tr>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>id</th>
            <th>title</th>
            <th>title_eng</th>
            <th>site_url</th>
            <th>image</th>
          </tr>
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
          <tr>
            <th>createdAt</th>
            <th>updatedAt</th>
            <th>id</th>
            <th>title</th>
            <th>image</th>
          </tr>
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
