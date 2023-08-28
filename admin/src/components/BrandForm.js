import React, { useEffect, useState } from 'react';

const API_BASE_URL = 'https://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.io';

function BrandForm() {
  const [brands, setBrands] = useState([]);
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [selectedStylePoint, setSelectedStylePoint] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
    fetchStylePoints();
  }, []);

  const fetchStylePoints = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stylepoints`);
      if (response.ok) {
        const data = await response.json();
        setStylePoints(data);
        setError(null);
      } else {
        const errorMessage = `스타일포인트 가져오기 실패: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `스타일포인트 가져오기 오류: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/brands`);
      if (response.ok) {
        const data = await response.json();
        setBrands(data.content);
        setError(null);
      } else {
        const errorMessage = `브랜드 가져오기 실패: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `브랜드 가져오기 오류: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setTitle(brand.title);
    setDescription(brand.description);
    setSiteUrl(brand.site_url);
    setSelectedStylePoint(stylePoints.find(point => point.id === brand.stylepointId));
  };

  const handleUpdateBrand = async () => {
    try {
      if (!selectedBrand) return;
      const updatedData = {
        title,
        description,
        site_url: siteUrl,
        stylepointId: selectedStylePoint.id,
      };
      const response = await fetch(`${API_BASE_URL}/admin/brand/${selectedBrand.id}`, {
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
        const errorMessage = `브랜드 수정 실패: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `브랜드 수정 오류: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  const handleDeleteBrand = async () => {
    try {
      if (!selectedBrand) return;
      const response = await fetch(`${API_BASE_URL}/admin/brand/${selectedBrand.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchBrands();
        setSelectedBrand(null); // Clear selectedBrand after deletion
        setError(null);
      } else {
        const errorMessage = `Delete brand failed with status: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `Delete brand error: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  const handleBrandSubmit = async () => {
    try {
      const newBrandData = {
        title,
        description,
        site_url: siteUrl,
        stylepointId: selectedStylePoint.id,
      };
      const response = await fetch(`${API_BASE_URL}/admin/brand/create`, {
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
        const errorMessage = `브랜드 등록 실패: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `브랜드 등록 오류: ${error.message}`;
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
        {selectedBrand ? (
          <div>
            <h3>Edit Brand</h3>
            <div>
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label>Style Point:</label>
              <select value={selectedStylePoint ? selectedStylePoint.id : ''} onChange={(e) => setSelectedStylePoint(stylePoints.find(point => point.id === parseInt(e.target.value)))}>
                <option value="">스타일 포인트 선택</option>
                {stylePoints.map(point => (
                  <option key={point.id} value={point.id}>{point.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <label>Site URL:</label>
              <input type="text" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
            </div>
            <button onClick={handleUpdateBrand}>브랜드 수정</button>
            <button onClick={handleDeleteBrand}>브랜드 삭제</button>
          </div>
        ) : (
          <div>
            <h3>Create Brand</h3>
            <div>
              <label>Title:</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <label>Style Point:</label>
              <select value={selectedStylePoint ? selectedStylePoint.id : ''} onChange={(e) => setSelectedStylePoint(stylePoints.find(point => point.id === parseInt(e.target.value)))}>
                <option value="">스타일 포인트 선택</option>
                {stylePoints.map(point => (
                  <option key={point.id} value={point.id}>{point.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Description:</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
              <label>Site URL:</label>
              <input type="text" value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
            </div>
            <button onClick={handleBrandSubmit}>브랜드 등록</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandForm;