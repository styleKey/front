import React, { useEffect, useState } from 'react';

function BrandForm() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/admin/brands');
      if (response.ok) {
        const data = await response.json();
        setBrands(data.content);
        setError(null);
      } else {
        const errorMessage = `Fetch brands failed with status: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `Fetch brands error: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setTitle(brand.title);
    setDescription(brand.description);
    setSiteUrl(brand.site_url);
  };

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
      if (response.ok) {
        const updatedBrand = await response.json();
        fetchBrands();
        setError(null);
      } else {
        const errorMessage = `Update brand failed with status: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `Update brand error: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <div>
      <h2>Brand Management</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
