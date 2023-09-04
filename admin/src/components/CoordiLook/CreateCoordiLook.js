import React, { useState, useEffect } from 'react';
import getData from '../../api/getData';
import postData from '../../api/postData';
import FormField from '../FormField';

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
      <h2>Create New coordilook</h2>

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

        <FormField label="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <FormField label="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} />

        <button type="submit" className="btn btn-create">create</button>
      </form>

      <div className="New">
        {createdCoordiLook && (
          <div>
            <h3>Created {createdCoordiLook.title} coordiLook</h3>
            <CoordiLookTableSingle coordiLook={createdCoordiLook} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCoordiLook;
