import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedStylePoint, setSelectedStylePoint] = useState(null);

  useEffect(() => {
    fetchStylePoints();
  }, []);

  const fetchStylePoints = async () => {
    try {
      const response = await axios.get('/admin/stylepoints'); // Assuming you have the appropriate API endpoint
      setStylePoints(response.data);
    } catch (error) {
      console.error('Error fetching style points:', error);
    }
  };

  const fetchStylePointDetails = async (id) => {
    try {
      const response = await axios.get(`/admin/stylepoint/${id}`);
      setSelectedStylePoint(response.data);
    } catch (error) {
      console.error('Error fetching style point details:', error);
    }
  };

  const updateStylePoint = async (id, updatedData) => {
    try {
      const response = await axios.put(`/admin/stylepoint/${id}`, updatedData);
      // Update the style points list with the updated data
      const updatedStylePoints = stylePoints.map((point) =>
        point.id === id ? response.data : point
      );
      setStylePoints(updatedStylePoints);
    } catch (error) {
      console.error('Error updating style point:', error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
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
          <button onClick={() => updateStylePoint(selectedStylePoint.id, selectedStylePoint)}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
