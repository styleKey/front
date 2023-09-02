import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BrandTableRow from './BrandTableRow';
import BrandTable from './BrandTable';

const CreateBrand = () => {
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedStylePoint, setSelectedStylePoint] = useState('');
  const [title, setTitle] = useState('');
  const [title_eng, setTitleEng] = useState('');
  const [description, setDescription] = useState('');
  const [site_url, setSiteUrl] = useState('');
  const [image, setImage] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [createdBrand, setCreatedBrand] = useState(null);


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
    const newBrand = {
      stylepointId: selectedStylePoint,
      title,
      title_eng,
      description,
      site_url,
      image,
    };

    try {
      const response = await axios.post('/admin/brand/create', newBrand);
      setSuccessMessage('Brand created successfully.');
      setCreatedBrand(response.data.brand);
    } catch (error) {
      setErrorMessage('Error creating brand.');
    }
  };

  return (
    <div>
      <h2>Create New Brand</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

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
          <label>title_eng</label>
          <input type="text" value={title_eng} onChange={(event) => setTitleEng(event.target.value)} required />
        </div>
        <div>
          <label>description</label>
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} required />
        </div>
        <div>
          <label>site_url</label>
          <input type="text" value={site_url} onChange={(event) => setSiteUrl(event.target.value)} required />
        </div>
        <div>
          <label>image</label>
          <input type="text" value={image} onChange={(event) => setImage(event.target.value)} required />
        </div>
        <button type="submit" className="btn btn-create">create</button>
      </form>

      {createdBrand && (
        <div>
          <h3>Created Brand</h3>
          <table>
            <thead>
              <BrandTableRow />
            </thead>
            <tbody>
              <BrandTable brand={createdBrand} />
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default CreateBrand;
