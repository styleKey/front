import React, { useState, useEffect } from 'react';

function ItemForm() {
  const [items, setItems] = useState([]);
  const [brands, setBrands] = useState([]); // Assuming you have a list of brands
  const [categories, setCategories] = useState([]); // Assuming you have a list of categories
  const [stylePoints, setStylePoints] = useState([]); // Assuming you have a list of style points
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStylePoint, setSelectedStylePoint] = useState('');
  const [error, setError] = useState(null); // Add state for error messages


  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      // Fetch item data from API
      const response = await fetch('https://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.iohttps://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.io/admin/items'); // Replace with your API endpoint

      if (!response.ok) {
        setError(`Fetch items failed with status: ${response.status}`);
        console.error(`Fetch items failed with status: ${response.status}`);
        return;
      }

      const data = await response.json();
      setItems(data);
      setError(null); // Clear error on successful fetch
    } catch (error) {
      setError('Fetch items error: ' + error.message);
      console.error('Fetch items error:', error);
    }
  };


  const handleAddItem = async () => {
    try {
      const newItem = {
        brandId: selectedBrand,
        categoryId: selectedCategory,
        stylePointId: selectedStylePoint,
      };
      // Add new item using API
      await fetch('https://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.iohttps://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.io/admin/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });
      // Handle item added, e.g., refetch data
      fetchItems();
    } catch (error) {
      console.error('Add item error:', error);
    }
  };

  return (
    <div>
      <h2>Style Points</h2>
      {/* 에러 메시지 출력 */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Item Management</h2>
        <div>
          <h3>Add Item</h3>
          <div>
            <label>Select Brand:</label>
            <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="">Select a brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Select Category:</label>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Select Style Point:</label>
            <select value={selectedStylePoint} onChange={(e) => setSelectedStylePoint(e.target.value)}>
              <option value="">Select a style point</option>
              {stylePoints.map((stylePoint) => (
                <option key={stylePoint.id} value={stylePoint.id}>{stylePoint.title}</option>
              ))}
            </select>
          </div>
          <button onClick={handleAddItem}>Add Item</button>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
