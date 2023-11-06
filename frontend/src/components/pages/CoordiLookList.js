import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getData from '../../api/getData';

function CoordiLookList() {
  const { stylepointId } = useParams();
  const [coordiLooks, setCoordiLooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`coordilook/stylepoint/${stylepointId}`);
        setCoordiLooks(data);
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
      <h2>CoordiLooks for Style Point</h2>
      <ul>
        {coordiLooks.map((coordiLook) => (
          <li key={coordiLook.id}>
            <Link to={`/coordilook/${coordiLook.id}`}>
              <h3>{coordiLook.title}</h3>
              <img src={coordiLook.image} alt={coordiLook.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoordiLookList;
