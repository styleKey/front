import React, { useState, useEffect } from 'react';
import getData from '../../api/getData';
import postData from '../../api/postData';

import { CoordiLookTableSingle } from './CoordiLookTable';

const CreateCoordiLook = () => {
  const [stylePoints, setStylePoints] = useState([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const [selectedStylePoint, setSelectedStylePoint] = useState('');
  const [createdCoordiLook, setCreatedCoordiLook] = useState(null);

  useEffect(() => {
    const fetchStylePoints = async () => {
      const data = await getData('stylepoints');
      if (data) {
        setStylePoints(data);
      }
    };
    fetchStylePoints();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newData = {
      stylepointId: selectedStylePoint,
      title,
      image,
    };
    postData('coordilook', newData, (createdData) => { setCreatedCoordiLook(createdData); });
  };

  return (
    <div>
      <h2>Create New CoordiLook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>stylepoint</label>
          <select value={selectedStylePoint} onChange={(event) => setSelectedStylePoint(event.target.value)} required >
            <option value="">stylepoint</option>
            {stylePoints && stylePoints.map((stylePoint) => (
              <option key={stylePoint.id} value={stylePoint.id}> {stylePoint.title} </option>
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
        <div>
          <h3>Created CoordiLook</h3>
          <CoordiLookTableSingle coordiLook={createdCoordiLook} />
        </div>
      )}
    </div>
  );
};

export default CreateCoordiLook;
