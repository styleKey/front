import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getData from '../../api/getData';

function StylePointDetail() {
  const { stylepointId } = useParams();
  const [stylePoint, setStylePoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`stylepoint/${stylepointId}`);
        setStylePoint(data);
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
    return <div>Error: Unable to load style point details. Please try again later.</div>;
  }

  if (!stylePoint) {
    return <div>No data found for this style point.</div>;
  }

  return (
    <div>
      <h2>Style Point Detail</h2>
      <h3>{stylePoint.title}</h3>
      <p>{stylePoint.description}</p>
      <img src={stylePoint.image} alt={stylePoint.title} />
      <Link to={`/brand/stylepoint/${stylePoint.id}`}>View Brands</Link>
      <Link to={`/coordilook/stylepoint/${stylePoint.id}`}>View CoordiLooks</Link>
    </div>
  );
}

export default StylePointDetail;
