import React, { useState, useEffect } from 'react';
import getData from '../../api/getData';
import postData from '../../api/postData';
import deleteData from '../../api/deleteData';

import FormField from '../FormField';

import { BrandTableSingle } from './BrandTable';

const CreateBrand = () => {
  const [stylePoints, setStylePoints] = useState([]);
  const [title, setTitle] = useState('');
  const [title_eng, setTitleEng] = useState('');
  const [description, setDescription] = useState('');
  const [site_url, setSiteUrl] = useState('');
  const [image, setImage] = useState('');

  const [selectedStylePoint, setSelectedStylePoint] = useState('');
  const [createdBrand, setCreatedBrand] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('stylepoints');
      if (data) {
        setStylePoints(data);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newData = {
      stylepointId: selectedStylePoint,
      title,
      title_eng,
      description,
      site_url,
      image,
    };
    postData('brand', newData, (createdData) => { setCreatedBrand(createdData.brand); });
  };

  const handleDelete = async (id) => {
    await deleteData('brand', id);
    window.location.reload();
  };

  return (
    <div>
      <h2>Create New brand</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>stylepoint</label>
          <select value={selectedStylePoint} onChange={(event) => setSelectedStylePoint(event.target.value)} required >
            <option value="">stylepoint</option>
            {stylePoints && stylePoints.map((stylePoint) => (
              <option key={stylePoint.id} value={stylePoint.id}>{stylePoint.title}</option>
            ))}
          </select>
        </div>

        <FormField label="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <FormField label="title_eng" type="text" value={title_eng} onChange={(e) => setTitleEng(e.target.value)} />
        <FormField label="description" type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
        <FormField label="site_url" type="text" value={site_url} onChange={(e) => setSiteUrl(e.target.value)} />
        <FormField label="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} />

        <button type="submit" className="btn btn-create">create</button>
      </form>

      <div className="New">
        {createdBrand && (
          <div>
            <h3>Created {createdBrand.title} brand</h3>
            <BrandTableSingle brand={createdBrand} onDelete={handleDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBrand;
