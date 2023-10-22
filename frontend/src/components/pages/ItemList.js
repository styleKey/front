import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getData from '../../api/getData';

function ItemList() {
  const { coordilookId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`item/coordilook/${coordilookId}`);
        setItems(data.items);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [coordilookId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Items for CoordiLook</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={`/item/${item.id}`}>
              <h3>{item.title}</h3>
              <p>Sales Link: <a href={item.sales_link} target="_blank" rel="noopener noreferrer">Visit</a></p>
              <img src={item.image} alt={item.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
