import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getData from '../../api/getData';

function BrandList() {
  const { stylepointId } = useParams();
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`brand/stylepoint/${stylepointId}`);
        setBrands(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [stylepointId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Brands for Style Point</h2>
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>
            <Link to={`/brand/${brand.id}`}>
              <h3>{brand.title}</h3>
              <p>{brand.description}</p>
              <img src={brand.image} alt={brand.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrandList;
