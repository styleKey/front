import React, { useEffect, useState } from 'react';

function BrandForm() {
  // State for brand list
  const [brands, setBrands] = useState([]);
  // State for selected brand
  const [selectedBrand, setSelectedBrand] = useState(null);
  // State for form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [siteUrl, setSiteUrl] = useState('');

  // Fetch brands on component mount
  useEffect(() => {
    fetchBrands();
  }, []);

  // Fetch list of brands
  const fetchBrands = async () => {
    try {
      const response = await fetch('/admin/brands'); // Replace with your API endpoint
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error('Fetch brands error:', error);
    }
  };

  // Handle brand selection
  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setTitle(brand.title);
    setDescription(brand.description);
    setSiteUrl(brand.site_url);
  };

  // Handle brand update
  const handleUpdateBrand = async () => {
    try {
      if (!selectedBrand) return;
      const updatedData = {
        title,
        description,
        site_url: siteUrl,
      };
      const response = await fetch(`/admin/brand/${selectedBrand.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const updatedBrand = await response.json();
      // Handle updated brand, e.g., refetch data
      fetchBrands();
    } catch (error) {
      console.error('Update brand error:', error);
    }
  };

  return (
    <div>
      <h2>Brand Management</h2>
      <div>
        <div>
          <h3>Brand List</h3>
          <ul>
            {brands.map((brand) => (
              <li key={brand.id} onClick={() => handleBrandClick(brand)}>
                {brand.title}
              </li>
            ))}
          </ul>
        </div>
        {selectedBrand && (
          <div>
            <h3>Edit Brand</h3>
            <div>
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <label>Site URL:</label>
              <input type="text" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
            </div>
            <button onClick={handleUpdateBrand}>Update Brand</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandForm;
