import React, { useEffect, useState } from 'react';

function BrandForm() {
  const [brands, setBrands] = useState([]);
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [title, setTitle] = useState('');
  const [title_eng, setTitleEng] = useState('');
  const [description, setDescription] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [selectedStylePoint, setSelectedStylePoint] = useState('');
  const [image, setImage] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
    fetchStylePoints();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch('/admin/brands');
      if (response.ok) {
        const data = await response.json();
        setBrands(data.content);
        setError(null);
      } else {
        handleError('Failed to fetch Brands', response.status);
      }
    } catch (error) {
      handleError('Error fetching Brands', error.message);
    }
  };

  const fetchStylePoints = async () => {
    try {
      const response = await fetch('/admin/stylepoints');
      if (response.ok) {
        const data = await response.json();
        setStylePoints(data);
        setError(null);
      } else {
        handleError('Failed to fetch StylePoints', response.status);
      }
    } catch (error) {
      handleError('Error fetching StylePoints', error.message);
    }
  };


  const fetchBrandItems = async (brandId) => {
    try {
      const response = await fetch(`/admin/brand/${brandId}/items`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
        setError(null);
      } else {
        handleError('Brand 아이템 가져오기 실패', response.status);
      }
    } catch (error) {
      handleError('Brand 아이템 가져오기 오류', error.message);
    }
  };

  const handleError = (message, errorDetail) => {
    const errorMessage = `${message}: ${errorDetail}`;
    setError(errorMessage);
    console.error(errorMessage);
  };

  const handleBrandClick = async (brand) => {
    setSelectedBrand(brand);
    setTitle(brand.title);
    setTitleEng(brand.title_eng);
    setDescription(brand.description);
    setSiteUrl(brand.site_url);
    setSelectedStylePoint(stylePoints.find(point => point.id === brand.stylepointId));
    setImage(brand.image);
    await fetchBrandItems(brand.id);
  };

  const handleBrandCreate = async () => {
    try {
      const newBrandData = {
        title,
        title_eng,
        description,
        site_url: siteUrl,
        stylepointId: selectedStylePoint.id,
        image
      };
      const response = await fetch(`/admin/brand/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBrandData),
      });
      if (response.ok) {
        fetchBrands();
        setError(null);
      } else {
        handleError('Brand 등록 실패', response.status);
      }
    } catch (error) {
      handleError('Brand 등록 오류', error.message);
    }
  };

  const handleUpdateBrand = async () => {
    try {
      if (!selectedBrand) return;
      const updatedData = {
        title,
        title_eng,
        description,
        site_url: siteUrl,
        stylepointId: selectedStylePoint.id,
        image
      };
      const response = await fetch(`/admin/brand/${selectedBrand.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchBrands();
        setError(null);
      } else {
        handleError('Brand 수정 실패', response.status);
      }
    } catch (error) {
      handleError('Brand 수정 오류', error.message);
    }
  };

  const handleDeleteBrand = async () => {
    try {
      if (!selectedBrand) return;
      const response = await fetch(`/admin/brand/${selectedBrand.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchBrands();
        setSelectedBrand(null);
        setError(null);
      } else {
        handleError('Brand 삭제 실패', response.status);
      }
    } catch (error) {
      handleError('Brand 삭제 오류', error.message);
    }
  };

  return (
    <div className="form">
      <header className="header">
        <h2>Brand</h2>
        {error && <p className="error-message">{error}</p>}
      </header>
      <div className="container">
        <div className="list-card">
          <h3>Brand List</h3>
          <ul className="list">
            {brands.map((brand) => {
              const stylePoint = stylePoints.find(point => point.id === brand.stylepointId);
              return (
                <li key={brand.id} onClick={() => handleBrandClick(brand)}>
                  {brand.title} ({brand.title_eng}) - Style Point: {stylePoint ? stylePoint.title : 'None'}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h3>{selectedBrand ? 'Update Brand' : 'Create Brand'}</h3>
          <div className="input-container">
            <label>Title</label>
            <br />
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="input-container">
            <label>영문 Title</label>
            <br />
            <input type="text" value={title_eng} onChange={(e) => setTitleEng(e.target.value)} />
          </div>
          <div className="input-container">
            <label>Style Point</label>
            <br />
            <select value={selectedStylePoint ? selectedStylePoint.id : ''} onChange={(e) => setSelectedStylePoint(stylePoints.find(point => point.id === parseInt(e.target.value)))}>
              <option value="">스타일 포인트 선택</option>
              {stylePoints.map(point => (
                <option key={point.id} value={point.id}>{point.title}</option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <label>Description</label>
            <br />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="input-container">
            <label>Site URL</label>
            <br />
            <input type="text" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
          </div>
          <div className="input-container">
            <label>Image URL</label>
            <br />
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          {selectedBrand ? (
            <>
              <button className="button" onClick={handleUpdateBrand}>Update Brand</button>
              <button className="button" onClick={handleDeleteBrand}>Delete Brand</button>
            </>
          ) : (
            <button className="button" onClick={handleBrandCreate}>Create Brand</button>
          )}
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h3>Brand Details</h3>
          {selectedBrand && (
            <div>
              <p><strong>Title:</strong> {selectedBrand.title}</p>
              <p><strong>영문 Title:</strong> {selectedBrand.title_eng}</p>
              <p><strong>Description:</strong> {selectedBrand.description}</p>
              <p><strong>Site URL:</strong> {selectedBrand.site_url}</p>
              <p><strong>Image:</strong> <img src={selectedBrand.image} alt="Brand" /></p>
              <p><strong>Style Point:</strong> {selectedStylePoint ? selectedStylePoint.title : 'None'}</p>

              <h4>Items:</h4>
              <ul>
                {items.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );

}

export default BrandForm;
