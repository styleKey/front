import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ItemForm = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stylePoints, setStylePoints] = useState([]);
  const [newItemData, setNewItemData] = useState({
    title: '',
    brandId: '',
    categoryId: '',
    stylePointId: '',
  });

  useEffect(() => {
    fetchItems();
    fetchBrands();
    fetchCategories();
    fetchStylePoints();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/admin/items'); // Replace with the actual API endpoint
      setItems(response.data.content);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get('/admin/brands'); // Replace with the actual API endpoint
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/admin/categories'); // Replace with the actual API endpoint
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchStylePoints = async () => {
    try {
      const response = await axios.get('/admin/stylepoints'); // Replace with the actual API endpoint
      setStylePoints(response.data);
    } catch (error) {
      console.error('Error fetching style points:', error);
    }
  };

  const handleItemSelect = (itemId) => {
    const selectedItem = items.find((item) => item.id === itemId);
    setSelectedItem(selectedItem);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleItemSubmit = async () => {
    try {
      const response = await axios.post('/admin/items', newItemData); // Replace with the actual API endpoint
      setNewItemData({
        title: '',
        brandId: '',
        categoryId: '',
        stylePointId: '',
      });
      fetchItems();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleItemUpdate = async () => {
    try {
      await axios.put(`/admin/item/${selectedItem.id}`, {
        // Updated item data
      }); // Replace with the actual API endpoint
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleItemDelete = async () => {
    try {
      await axios.delete(`/admin/item/${selectedItem.id}`); // Replace with the actual API endpoint
      setSelectedItem(null);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div>
      <h2>Item Management</h2>
      <div className="items-list">
        {items.map((item) => (
          <div key={item.id} onClick={() => handleItemSelect(item.id)}>
            {item.title}
          </div>
        ))}
      </div>
      <div className="item-details">
        {/* Display item details */}
        {selectedItem && (
          <div>
            <h3>Item Details</h3>
            <div>Title: {selectedItem.title}</div>
            {/* Display more details as needed */}
            <button onClick={handleItemUpdate}>Update</button>
            <button onClick={handleItemDelete}>Delete</button>
          </div>
        )}
      </div>
      <div className="item-form">
        <h3>Add New Item</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newItemData.title}
          onChange={handleInputChange}
        />
        <select
          name="brandId"
          value={newItemData.brandId}
          onChange={handleInputChange}
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.title}
            </option>
          ))}
        </select>
        <select
          name="categoryId"
          value={newItemData.categoryId}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.title}
            </option>
          ))}
        </select>
        <select
          name="stylePointId"
          value={newItemData.stylePointId}
          onChange={handleInputChange}
        >
          <option value="">Select Style Point</option>
          {stylePoints.map((stylePoint) => (
            <option key={stylePoint.id} value={stylePoint.id}>
              {stylePoint.title}
            </option>
          ))}
        </select>
        <button onClick={handleItemSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ItemForm;
