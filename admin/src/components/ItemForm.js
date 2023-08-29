import React, { useEffect, useState } from 'react';

function ItemForm() {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stylePoints, setStylePoints] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [title, setTitle] = useState('');
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [stylePointId, setStylePointId] = useState('');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStylePoint, setSelectedStylePoint] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
    fetchCategories();
    fetchStylePoints();
    fetchItems();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(`/admin/brands`);
      if (response.ok) {
        const data = await response.json();
        setBrands(data.content || []);
        setError(null);
      } else {
        handleError('Brand 가져오기 실패', response.status);
      }
    } catch (error) {
      handleError('Brand 가져오기 오류', error.message);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`/admin/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data.content || []);
        setError(null);
      } else {
        handleError('Category 가져오기 실패', response.status);
      }
    } catch (error) {
      handleError('Category 가져오기 오류', error.message);
    }
  };

  const fetchStylePoints = async () => {
    try {
      const response = await fetch(`/admin/stylepoints`);
      if (response.ok) {
        const data = await response.json();
        setStylePoints(data || []);
        setError(null);
      } else {
        handleError('StylePoint 가져오기 실패', response.status);
      }
    } catch (error) {
      handleError('StylePoint 가져오기 오류', error.message);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`/admin/items`);
      if (response.ok) {
        const data = await response.json();
        setItems(data.content || []);
        setError(null);
      } else {
        handleError('Item 가져오기 실패', response.status);
      }
    } catch (error) {
      handleError('Item 가져오기 오류', error.message);
    }
  };

  const handleError = (message, errorDetail) => {
    const errorMessage = `${message}: ${errorDetail}`;
    setError(errorMessage);
    console.error(errorMessage);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setTitle(item.title);
    setBrandId(item.brandId);
    setCategoryId(item.categoryId);
    setStylePointId(item.stylePointId);
    setSelectedBrand(brands.find(brand => brand.id === item.brandId));
    setSelectedCategory(categories.find(category => category.id === item.categoryId));
    setSelectedStylePoint(stylePoints.find(point => point.id === item.stylePointId));
  };

  const handleItemCreate = async () => {
    try {
      const newItemData = {
        title,
        brandId,
        categoryId,
        stylePointId,
      };
      const response = await fetch(`/admin/item/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItemData),
      });
      if (response.ok) {
        fetchItems();
        setError(null);
      } else {
        handleError('Item 등록 실패', response.status);
      }
    } catch (error) {
      handleError('Item 등록 오류', error.message);
    }
  };

  const handleUpdateItem = async () => {
    try {
      if (!selectedItem) return;
      const updatedData = {
        title,
        brandId,
        categoryId,
        stylePointId,
      };
      const response = await fetch(`/admin/item/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchItems();
        setError(null);
      } else {
        handleError('Item 수정 실패', response.status);
      }
    } catch (error) {
      handleError('Item 수정 오류', error.message);
    }
  };

  const handleDeleteItem = async () => {
    try {
      if (!selectedItem) return;
      const response = await fetch(`/admin/item/${selectedItem.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchItems();
        setSelectedItem(null);
        setError(null);
      } else {
        handleError('Item 삭제 실패', response.status);
      }
    } catch (error) {
      handleError('Item 삭제 오류', error.message);
    }
  };

  return (
    <div className="form">
      <div className="container">
        <div className="list-card">
          <h3>Item List</h3>
          <ul className="list">
            {items.length > 0 ? (
              items.map((item) => (
                <li key={item.id} onClick={() => handleItemClick(item)}>
                  {item.title}
                </li>
              ))
            ) : (
              <li>No items available.</li>
            )}
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h3>{selectedItem ? 'Update Item' : 'Create Item'}</h3>
          <div className="input-container">
            <label>Title</label>
            <br />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Brand Dropdown */}
          <div className="input-container">
            <label>Brand</label>
            <br />
            {brands && brands.length > 0 && (
              <select value={selectedBrand ? selectedBrand.id : ''} onChange={(e) => setSelectedBrand(brands.find(brand => brand.id === parseInt(e.target.value)))}>
                <option value="">Select Brand</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="input-container">
            <label>Category</label>
            <br />
            {categories && categories.length > 0 && (
              <select value={selectedCategory ? selectedCategory.id : ''} onChange={(e) => setSelectedCategory(categories.find(category => category.id === parseInt(e.target.value)))}>
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            )}
          </div>

          {/* Style Point Dropdown */}
          <div className="input-container">
            <label>Style Point</label>
            <br />
            {stylePoints && stylePoints.length > 0 && (
              <select value={selectedStylePoint ? selectedStylePoint.id : ''} onChange={(e) => setSelectedStylePoint(stylePoints.find(point => point.id === parseInt(e.target.value)))}>
                <option value="">스타일 포인트 선택</option>
                {stylePoints.map(point => (
                  <option key={point.id} value={point.id}>{point.title}</option>
                ))}
              </select>
            )}
          </div>

          <div className="button-container">
            <button className="button" onClick={selectedItem ? handleUpdateItem : handleItemCreate}>
              {selectedItem ? 'Update' : 'Create'}
            </button>
            {selectedItem && (
              <button className="button" onClick={handleDeleteItem}>
                Delete
              </button>
            )}
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
