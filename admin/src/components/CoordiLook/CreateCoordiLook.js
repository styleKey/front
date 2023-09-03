import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CoordiLookTableRow from './CoordiLookTableRow';
import CoordiLookTable from './CoordiLookTable';

const CreateCoordiLook = () => {
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedStylePoint, setSelectedStylePoint] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const [createdCoordiLook, setCreatedCoordiLook] = useState(null);

  useEffect(() => {
    const fetchStylePoints = async () => {
      try {
        const response = await axios.get('/admin/stylepoints');
        setStylePoints(response.data);
      } catch (error) {
        console.error('Error fetching stylepoints:', error);
      }
    };
    fetchStylePoints();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newCoordiLook = {
      stylepointId: selectedStylePoint,
      title,
      image,
    };

    try {
      const response = await axios.post('/admin/coordilook/create', newCoordiLook);
      setCreatedCoordiLook(response.data);
    } catch (error) {
    }
  };

  return (
    <div>
      <h2>Create New CoordiLook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>stylepoint</label>
          <select
            value={selectedStylePoint}
            onChange={(event) => setSelectedStylePoint(event.target.value)}
            required
          >
            <option value="">Select a Style Point</option>
            {stylePoints && stylePoints.map((stylePoint) => (
              <option key={stylePoint.id} value={stylePoint.id}>
                {stylePoint.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>title</label>
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
        </div>
        <div>
          <label>image</label>
          <input type="text" value={image} onChange={(event) => setImage(event.target.value)} required />
        </div>
        <button type="submit" className="btn btn-create">Create</button>
      </form>

      {createdCoordiLook && (

        <table>
          <thead>
            <CoordiLookTableRow />
          </thead>
          <tbody>
            <CoordiLookTable key={createdCoordiLook.id} coordiLook={createdCoordiLook} />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CreateCoordiLook;
