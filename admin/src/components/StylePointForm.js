import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StylePointForm = () => {
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedStylePoint, setSelectedStylePoint] = useState(null);

  useEffect(() => {
    fetchStylePoints();
  }, []);

  const fetchStylePoints = async () => {
    try {
      const response = await axios.get('/admin/stylepoints'); // Updated relative path
      setStylePoints(response.data);
    } catch (error) {
      console.error('Error fetching style points:', error);
    }
  };

  const fetchStylePointDetails = async (id) => {
    try {
      const response = await axios.get(`/admin/stylepoint/${id}`); // Updated relative path
      setSelectedStylePoint(response.data.stylePoint); // Updated to access "stylePoint" from the response data
    } catch (error) {
      console.error('Error fetching style point details:', error);
    }
  };

  const updateStylePoint = async () => {
    try {
      if (!selectedStylePoint) return;

      const response = await axios.put(`/admin/stylepoint/${selectedStylePoint.id}`, {
        title: selectedStylePoint.title,
        description: selectedStylePoint.description,
        image: selectedStylePoint.image,
      }); // Updated relative path

      setStylePoints((prevStylePoints) =>
        prevStylePoints.map((point) => (point.id === response.data.id ? response.data : point))
      );
    } catch (error) {
      console.error('Error updating style point:', error);
    }
  };

  return (
    <div>
      <h2>Style Points</h2>
      <ul>
        {stylePoints.map((point) => (
          <li key={point.id}>
            {point.title} - {point.description}
            <button onClick={() => fetchStylePointDetails(point.id)}>Details</button>
          </li>
        ))}
      </ul>

      {selectedStylePoint && (
        <div>
          <h3>Selected Style Point: {selectedStylePoint.title}</h3>
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
          <button onClick={updateStylePoint}>Save</button>
        </div>
      )}
    </div>
  );
};

export default StylePointForm;
