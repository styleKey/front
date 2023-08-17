import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BrandForm = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get('/admin/brands');
      setBrands(response.data.content); // "content" 배열을 사용하여 브랜드 목록 업데이트
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const fetchBrandDetails = async (id) => {
    try {
      const response = await axios.get(`/admin/brand/${id}`);
      setSelectedBrand(response.data); // 응답 데이터 전체를 선택된 브랜드로 설정
    } catch (error) {
      console.error('Error fetching brand details:', error);
    }
  };

  const updateBrand = async () => {
    try {
      if (!selectedBrand) return;

      const response = await axios.put(`/admin/brand/${selectedBrand.id}`, {
        title: selectedBrand.title,
        title_eng: selectedBrand.title_eng,
        description: selectedBrand.description,
        site_url: selectedBrand.site_url,
        image: selectedBrand.image,
        stylepointId: selectedBrand.stylepointId,
      });

      setBrands((prevBrands) =>
        prevBrands.map((brand) => (brand.id === response.data.id ? response.data : brand))
      );
    } catch (error) {
      console.error('Error updating brand:', error);
    }
  };

  return (
    <div>
      <h2>Brands</h2>
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>
            {brand.title} - {brand.description}
            <button onClick={() => fetchBrandDetails(brand.id)}>Details</button>
          </li>
        ))}
      </ul>

      {selectedBrand && (
        <div>
          <h3>Selected Brand: {selectedBrand.title}</h3>
          <p>{selectedBrand.description}</p>
          <img src={selectedBrand.image} alt={selectedBrand.title} />

          <h4>Edit Brand</h4>
          <input
            type="text"
            value={selectedBrand.title}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <input
            type="text"
            value={selectedBrand.title_eng}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, title_eng: e.target.value }))
            }
          />
          <input
            type="text"
            value={selectedBrand.description}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <input
            type="text"
            value={selectedBrand.site_url}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, site_url: e.target.value }))
            }
          />
          <input
            type="text"
            value={selectedBrand.image}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, image: e.target.value }))
            }
          />
          <input
            type="text"
            value={selectedBrand.stylepointId}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, stylepointId: e.target.value }))
            }
          />
          <button onClick={updateBrand}>Save</button>
        </div>
      )}
    </div>
  );
};

export default BrandForm;
