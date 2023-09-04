import React, { useState, useEffect } from 'react';
import getData from '../../api/getData';
import postData from '../../api/postData';

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

  return (
    <div>
      <h2>Create New Brand</h2>
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

        <button type="submit" className="btn btn-edit">edit</button>
      </form>

      {createdBrand && (
        <div>
          <h3>Created Brand</h3>
          <BrandTableSingle brand={createdBrand} />
        </div>
      )}

    </div>
  );
};

export default CreateBrand;
