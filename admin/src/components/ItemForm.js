import React, { useState, useEffect } from 'react';
import axios from 'axios';
import brandData from '../testdatas/Brand.json';
import categoryData from '../testdatas/Category.json';
import itemsData from '../testdatas/Item.json';
import '../App.css';

const ItemForm = () => {
  const [item, setItem] = useState({
    brand_id: '',
    brand_title: '',
    category_id: '',
    category_title: '',
    item_id: '',
    item_sales_link: '',
    item_image: '',
    item_title: '',
  });

  // Calculate the next available item_id based on existing data
  useEffect(() => {
    const lastItemId = itemsData.length > 0 ? itemsData[itemsData.length - 1].item_id : 300; // Default to 300 if no data
    const nextItemId = lastItemId + 1;
    setItem((prevState) => ({ ...prevState, item_id: nextItemId }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Generate the image URL based on the brand_id
    const imageURL = `public/images/item_${item.item_id}.png`;

    setItem({ ...item, [name]: value, item_image: imageURL });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the item data in the required JSON format
    const itemData = {
      item_id: parseInt(item.item_id),
      brand_id: parseInt(item.brand_id),
      category_id: parseInt(item.category_id),
      item_title: item.item_title,
      item_sales_link: item.item_sales_link,
      item_image: item.item_image,
    };

    axios
      .post('/api/items', itemData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // Convert the item data to JSON format
    const itemJson = JSON.stringify(itemData, null, 2);

    // Create a new Blob with the JSON data
    const blob = new Blob([itemJson], { type: 'application/json' });

    // Create a download link and trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Item.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="item-form-container"> {/* Apply the CSS class to the container */}
    <h1>Item.json 생성</h1>
      <form onSubmit={handleSubmit}>
        <p>300번대를 입력하라</p>
        <select name="brand_id" onChange={handleChange} value={item.brand_id}>
          <option value="">Select Brand</option>
          {brandData.map((brand) => (
            <option key={brand.brand_id} value={brand.brand_id}>
              {brand.brand_title} (ID: {brand.brand_id})
            </option>
          ))}
        </select>
        <select name="category_id" onChange={handleChange} value={item.category_id}>
          <option value="">Select Category</option>
          {categoryData.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_title} (ID: {category.category_id})
            </option>
          ))}
        </select>
        {/* Auto-generated item_id field */}
        <input type="number" name="item_id" placeholder="Item ID" value={item.item_id} onChange={handleChange} />
        <input type="text" name="item_title" placeholder="Title" onChange={handleChange} />
        <input type="text" name="item_sales_link" placeholder="Sales Link" onChange={handleChange} />
        {/* Auto-generated item_image field */}
        <input type="text" name="item_image" placeholder="Image URL" value={item.item_image} onChange={handleChange} />

        <button type="submit">Download Item.json</button>
      </form>

    </div>
  );
};

export default ItemForm;
