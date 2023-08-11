import React, { useState } from 'react';
import categoryData from '../datas/Category.json'; // Import the category data
import '../App.css';

const CategoryForm = () => {
  const [category, setCategory] = useState({
    category_id: '', // Add category_id field
    category_title: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find the selected category object from the data
    const selectedCategory = categoryData.find((cat) => cat.category_id === parseInt(category.category_id));

    if (selectedCategory) {
      // Convert the selected category data to JSON format
      const categoryJson = JSON.stringify(selectedCategory, null, 2);

      // Create a new Blob with the JSON data
      const blob = new Blob([categoryJson], { type: 'application/json' });

      // Create a download link and trigger the download
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Category.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      console.error("Selected category not found!");
    }
  };

  return (
    <div className="category-form-container"> {/* Apply the CSS class to the container */}
    <h1>Category.json 생성</h1>
    <form onSubmit={handleSubmit}>
      <p>0번대를 입력하라</p>
      <select name="category_id" onChange={handleChange} value={category.category_id}>
        <option value="">Select Category</option>
        {categoryData.map((cat) => (
          <option key={cat.category_id} value={cat.category_id}>
            {cat.category_title} (ID: {cat.category_id})
          </option>
        ))}
      </select>
      <button type="submit">Download Category.json</button>
      </form>

</div>
);
};


export default CategoryForm;
