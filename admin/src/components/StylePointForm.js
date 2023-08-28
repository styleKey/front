import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StylePointForm = () => {
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedStylePoint, setSelectedStylePoint] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStylePoints();
  }, []);

  const fetchStylePoints = async () => {
    try {
      const response = await axios.get('https://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.io/admin/stylepoints');
      setStylePoints(response.data);
      setError(null);
    } catch (error) {
      handleError(error, 'Error fetching style points');
    }
  };

  const fetchStylePointDetails = async (id) => {
    try {
      const response = await axios.get(`https://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.io/admin/stylepoints/${id}`);
      setSelectedStylePoint(response.data.stylePoint);
      setError(null);
    } catch (error) {
      handleError(error, 'Error fetching style point details');
    }
  };

  const updateStylePoint = async () => {
    try {
      if (!selectedStylePoint) return;
      const response = await axios.put(`https://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.io/admin/stylepoints/${selectedStylePoint.id}`, {
        title: selectedStylePoint.title,
        description: selectedStylePoint.description,
        image: selectedStylePoint.image,
      });
      setStylePoints((prevStylePoints) =>
        prevStylePoints.map((point) => (point.id === response.data.id ? response.data : point))
      );
      setError(null);
    } catch (error) {
      handleError(error, 'Error updating style point');
    }
  };

  const handleError = (error, message) => {
    if (error.response && error.response.status === 404) {
      setError(`${message}: Data not found`);
    } else {
      setError(`${message}: ${error.message}`);
    }
    console.error(message, error);
  };

  return (
    <div>
      <h2>Style Points</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {stylePoints.map((point) => (
          <li key={point.id}>
            {point.title} - {point.description}
            <button onClick={() => fetchStylePointDetails(point.id)}>Details</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Selected Style Point: {selectedStylePoint ? selectedStylePoint.title : 'None'}</h3>
        {selectedStylePoint && (
          <div>
            <p>{selectedStylePoint.description}</p>
            <img src={selectedStylePoint.image} alt={selectedStylePoint.title} />
            <h4>Edit Style Point</h4>
            <input
              type="text"
              value={selectedStylePoint.title}
              onChange={(e) =>
                setSelectedStylePoint((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <input
              type="text"
              value={selectedStylePoint.description}
              onChange={(e) =>
                setSelectedStylePoint((prev) => ({ ...prev, description: e.target.value }))
              }
            />
            <input
              type="text"
              value={selectedStylePoint.image}
              onChange={(e) =>
                setSelectedStylePoint((prev) => ({ ...prev, image: e.target.value }))
              }
            />
            <button onClick={updateStylePoint}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StylePointForm;
