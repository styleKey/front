import React, { useState, useEffect } from 'react';
import getData from '../../api/getData';
import postData from '../../api/postData';

import { ItemTableSingle } from '../Item/ItemTable';

const CreateItem = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coordiLooks, setCoordiLooks] = useState([]);
  const [title, setTitle] = useState('');
  const [sales_link, setSalesLink] = useState('');
  const [image, setImage] = useState('');

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCoordiLook, setSelectedCoordiLook] = useState('');
  const [createdItem, setCreatedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const brandsData = await getData('brands');
      if (brandsData) {
        setBrands(brandsData.content);
      }
      const coordiLooksData = await getData('coordilooks');
      if (coordiLooksData) {
        setCoordiLooks(coordiLooksData.content);
      }
      const categoriesData = await getData('categories');
      if (categoriesData) {
        setCategories(categoriesData);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newData = {
      brandId: selectedBrand,
      categoryId: selectedCategory,
      coordilookId: selectedCoordiLook,
      title,
      sales_link,
      image,
    };
    postData('item', newData, (createdData) => { setCreatedItem(createdData) });
  };

  return (
    <div>
      <h2>Create New Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>brand</label>
          <select value={selectedBrand} onChange={(event) => setSelectedBrand(event.target.value)} required>
            <option value="">brand</option>
            {brands && brands.map((brand) => (
              <option key={brand.id} value={brand.id}>{brand.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label>coordilook</label>
          <select value={selectedCoordiLook} onChange={(event) => setSelectedCoordiLook(event.target.value)} required>
            <option value="">coordilook</option>
            {coordiLooks && coordiLooks.map((coordiLook) => (
              <option key={coordiLook.id} value={coordiLook.id}>{coordiLook.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label>category</label>
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} required>
            <option value="">category</option>
            {categories && categories.map((category) => (
              <option key={category.id} value={category.id}>{category.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label>title</label>
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} required />
        </div>

        <div>
          <label>sales_link</label>
          <input type="text" value={sales_link} onChange={(event) => setSalesLink(event.target.value)} />
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
          <ItemTableSingle item={createdItem} />
        </div>
      )}

    </div>
  );
};

export default CreateItem;
