import React, { useState } from 'react';
import stylePointsData from '../datas/StylePoint.json';
import '../App.css';

const StylePointForm = () => {
  const [stylePoint, setStylePoint] = useState({
    stylepoint_id: '',
    stylepoint_title: '',
    stylepoint_description: '',
    stylepoint_image: '',
    created_at: '',
    updated_at: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const imageURL = `public/images/stylepoint_${value}.png`;
    setStylePoint({ ...stylePoint, [name]: value, stylepoint_image: imageURL });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date().toISOString(); // Get the current date and time in ISO format

    // Create a JSON object with the entered data, including the current date as created_at
    const stylePointData = {
      stylepoint_id: stylePoint.stylepoint_id,
      stylepoint_title: stylePoint.stylepoint_title,
      stylepoint_description: stylePoint.stylepoint_description,
      stylepoint_image: stylePoint.stylepoint_image,
      created_at: currentDate,
      updated_at: currentDate, // Also set the updated_at field to the current date
    };

    const stylePointJson = JSON.stringify(stylePointData, null, 2);
    const blob = new Blob([stylePointJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'StylePoint.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="stylepoint-form-container">
      <h1>StylePoint.json 생성</h1>
      <form onSubmit={handleSubmit}>
        <p>100번대를 입력하라</p>
        <select
          name="stylepoint_id"
          onChange={handleChange}
          value={stylePoint.stylepoint_id}
        >
          <option value="">Select StylePoint</option>
          {stylePointsData.map((stylePointData) => (
            <option
              key={stylePointData.stylepoint_id}
              value={stylePointData.stylepoint_id}
            >
              {stylePointData.stylepoint_title} (ID: {stylePointData.stylepoint_id})
            </option>
          ))}
        </select>
        {/* Remove the 'Title' input field, it will be automatically set */}
        <input
          type="text"
          name="stylepoint_description"
          placeholder="Description"
          value={stylePoint.stylepoint_description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="stylepoint_image"
          placeholder="Image URL"
          value={stylePoint.stylepoint_image}
          onChange={handleChange}
        />
        {/* 'created_at' input field is removed, as it will be automatically set */}
        <button type="submit">Download StylePoint.json</button>
      </form>
    </div>
  );
};

export default StylePointForm;