import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const CoordiLookForm = () => {
  const [coordiLook, setCoordiLook] = useState({
    coordilook_id: '',
    brand_id: [],
    item_id: [],
    coordilook_title: '',
    coordilook_image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoordiLook({ ...coordiLook, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/coordilooks', coordiLook)
      .then((response) => {
        console.log(response.data); // Handle success, e.g., show a success message
      })
      .catch((error) => {
        console.error(error); // Handle error, e.g., show an error message
      });
  };

  return (
    <div className="coordilook-form-container"> {/* Apply the CSS class to the container */}
    <h1>json 생성</h1>
    <form onSubmit={handleSubmit}>
      <p>400번대를 입력하라</p>
      <input type="number" name="coordilook_id" placeholder="CoordiLook ID" onChange={handleChange} />
      <input type="number" name="brand_id" placeholder="Brand ID" onChange={handleChange} />
      <input type="number" name="item_id" placeholder="Item ID" onChange={handleChange} />
      <input type="text" name="coordilook_title" placeholder="Title" onChange={handleChange} />
      <input type="text" name="coordilook_image" placeholder="Image URL" onChange={handleChange} />
      <button type="submit">Submit</button>
      </form>

</div>
);
};


export default CoordiLookForm;
