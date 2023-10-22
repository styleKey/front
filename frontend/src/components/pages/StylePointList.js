import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import getData from '../../api/getData';

function StylePointList() {
  const [stylePoints, setStylePoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData('stylepoints');
        setStylePoints(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Unable to load style points. Please try again later.</div>;
  }

  return (
    <div>
      <h2>Style Points</h2>
      <ul>
        {stylePoints.map(stylePoint => (
          <li key={stylePoint.id}>
            <Link to={`/stylepoint/${stylePoint.id}`}>
              <h3>{stylePoint.title}</h3>
              <p>{stylePoint.description}</p>
              <img src={stylePoint.image} alt={stylePoint.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StylePointList;
