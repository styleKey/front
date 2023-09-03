import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ItemTableRow from './ItemTableRow';
import ItemTable from './ItemTable';

const CreateItem = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coordiLooks, setCoordiLooks] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCoordiLook, setSelectedCoordiLook] = useState('');

  const [title, setTitle] = useState('');
  const [salesLink, setSalesLink] = useState('');
  const [image, setImage] = useState('');

  const [createdItem, setCreatedItem] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('/admin/brands');
        setBrands(response.data.content);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();

    const fetchCoordiLooks = async () => {
      try {
        const response = await axios.get('/admin/coordilooks');
        setCoordiLooks(response.data.content);
      } catch (error) {
        console.error('Error fetching coordilooks:', error);
      }
    };
    fetchCoordiLooks();

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/admin/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    const newItem = {
      brandId: selectedBrand,
      categoryId: selectedCategory,
      coordilookId: selectedCoordiLook,
      title,
      sales_link: salesLink,
      image,
    };

    try {
      const response = await axios.post('/admin/item/create', newItem);
      setCreatedItem(response.data);
    } catch (error) {
    }

  };

  return (
    <div>
      <h2>Create New Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>brand</label>
          <select
            value={selectedBrand}
            onChange={(event) => setSelectedBrand(event.target.value)}
            required
          >
            <option value="">brand</option>
            {brands && brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.title}
              </option>
            ))}
          </select>
        </div>


        <div>
          <label>coordilook</label>
          <select
            value={selectedCoordiLook}
            onChange={(event) => setSelectedCoordiLook(event.target.value)}
            required
          >
            <option value="">coordilook</option>
            {coordiLooks && coordiLooks.map((coordiLook) => (
              <option key={coordiLook.id} value={coordiLook.id}>
                {coordiLook.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>category</label>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            required
          >
            <option value="">category</option>
            {categories && categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>title</label>
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
        </div>
        <div>
          <label>sales_link</label>
          <input type="text" value={salesLink} onChange={(event) => setSalesLink(event.target.value)} />
        </div>
        <div>
          <label>image</label>
          <input type="text" value={image} onChange={(event) => setImage(event.target.value)} required />
        </div>
        <button type="submit" className="btn btn-create">Create</button>
      </form>

      {createdItem && (
        <div>
          <h3>Created Item</h3>
          <table>
            <thead>
              <ItemTableRow />
            </thead>
            <tbody>
              <ItemTable key={createdItem.id} item={createdItem} />
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default CreateItem;
