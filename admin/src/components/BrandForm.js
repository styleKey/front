import React, { useState, useEffect } from 'react';
import axios from 'axios';
import brandData from '../datas/Brand.json'; // Import the brand data
import '../App.css';

const BrandForm = () => {
  const [brand, setBrand] = useState({
    brand_id: 0, // Initialize brand_id field with 0
    brand_title: '',
    brand_description: '',
    brand_image: '',
    brand_site_url: '',
  });

  // Calculate the next available brand_id based on existing data
  useEffect(() => {
    const lastBrandId = brandData.length > 0 ? brandData[brandData.length - 1].brand_id : 200; // Default to 200 if no data
    const nextBrandId = lastBrandId + 1;
    setBrand((prevState) => ({ ...prevState, brand_id: nextBrandId }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Generate the image URL based on the brand_id
    const imageURL = `public/images/brand_${brand.brand_id}.png`; // Use brand_id from the state

    setBrand({ ...brand, [name]: value, brand_image: imageURL });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/brands', brand)
      .then((response) => {
        console.log(response.data); // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error(error); // Handle error, e.g., show an error message
      });

    // Convert the brand data to JSON format
    const brandJson = JSON.stringify([brand], null, 2);

    // Create a new Blob with the JSON data
    const blob = new Blob([brandJson], { type: 'application/json' });

    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Brand.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="brand-form-container"> {/* Apply the CSS class to the container */}
      <h1>Brand.json 생성</h1>
      <form onSubmit={handleSubmit}>
        <p>200번대를 입력하라</p>
        <input type="number" name="brand_id" placeholder="Brand ID" value={brand.brand_id} onChange={handleChange} />
        <input type="text" name="brand_title" placeholder="Title" onChange={handleChange} />
        <input type="text" name="brand_description" placeholder="Description" onChange={handleChange} />
        {/* You can make this input disabled if you want to auto-generate the image URL */}
        <input type="text" name="brand_image" placeholder="Image URL" value={brand.brand_image} onChange={handleChange} />
        <input type="text" name="brand_site_url" placeholder="Website URL" onChange={handleChange} />
        <button type="submit">Download Brand.json</button>
      </form>
    </div>
  );
};

export default BrandForm;
