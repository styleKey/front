import React, { useEffect, useState } from 'react';

const API_BASE_URL = 'https://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.io';

function BrandForm() {
  const [brands, setBrands] = useState([]);
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [title, setTitle] = useState('');
  const [title_eng, setTitleEng] = useState('');
  const [description, setDescription] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [selectedStylePoint, setSelectedStylePoint] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
    fetchStylePoints();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/brands`);
      if (response.ok) {
        const data = await response.json();
        setBrands(data.content);
        setError(null);
      } else {
        const errorMessage = `Brand 가져오기 실패: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `Brand 가져오기 오류: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
    setTitle(brand.title);
    setTitleEng(brand.title_eng);
    setDescription(brand.description);
    setSiteUrl(brand.site_url);
    setSelectedStylePoint(stylePoints.find(point => point.id === brand.stylepointId));
  };

  const fetchStylePoints = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stylepoints`);
      if (response.ok) {
        const data = await response.json();
        setStylePoints(data);
        setError(null);
      } else {
        const errorMessage = `tylePoint 가져오기 실패: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `tylePoint 가져오기 오류: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  const handleBrandCreate = async () => {
    try {
      const newBrandData = {
        title,
        title_eng,
        description,
        site_url: siteUrl,
        stylepointId: selectedStylePoint.id
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
        const errorMessage = `Brand 등록 실패: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `Brand 등록 오류: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage);
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
        stylepointId: selectedStylePoint.id
      };
      const response = await fetch(`${API_BASE_URL}/admin/brand/${selectedBrand.id}`, {
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
        const errorMessage = `Brand 수정 실패: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `Brand 수정 오류: ${error.message}`;
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
        setSelectedBrand(null);
        setError(null);
      } else {
        const errorMessage = `Brand 삭제 실패: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `Brand 삭제 오류: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <div className="brand-form">
      <header className="brand-header">
        <h2>Brand</h2>
        {error && <p className="error-message">{error}</p>}
      </header>
      <div className="brand-container">
        <div className="brand-card">
          <h3>Create Brand</h3>
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
          <button className="brand-button" onClick={handleBrandCreate}>브랜드 등록</button>
          <button className="brand-button" onClick={selectedBrand ? handleUpdateBrand : handleBrandCreate}>
            {selectedBrand ? '브랜드 수정' : '브랜드 등록'}
          </button>
          {selectedBrand && (
            <button className="brand-button" onClick={handleDeleteBrand}>브랜드 삭제</button>
          )}
        </div>
      </div>
      <div className="brand-list-card">
        <h3>Brand List</h3>
        <ul className="brand-list">
          {brands.map((brand) => (
            <li key={brand.id} onClick={() => handleBrandClick(brand)}>
              {brand.stylepointId} {brand.title} ({brand.title_eng})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BrandForm;
