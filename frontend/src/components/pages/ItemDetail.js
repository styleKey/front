import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getData from '../../api/getData';

function ItemDetail() {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData(`item/${itemId}`);
        setItem(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!item) {
    return <div>No data found for this item.</div>;
  }

  return (
    <div>
      <h2>Item Detail</h2>
      <h3>{item.title}</h3>
      <p>Sales Link: <a href={item.sales_link} target="_blank" rel="noopener noreferrer">Visit</a></p>
      <img src={item.image} alt={item.title} />
      <p>Brand: {item.brand.title}</p>
      <p>Category: {item.category.title}</p>
      <p>CoordiLook: {item.coordilook.title}</p>
    </div>
  );
}

export default ItemDetail;
