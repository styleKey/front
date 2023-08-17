import React, { useState, useEffect } from 'react';
import axios from 'axios';

// BrandForm 컴포넌트 정의
const BrandForm = () => {
  // 상태 변수 선언: 브랜드 목록과 선택된 브랜드
  const [brands, setBrands] = useState([]); // 빈 배열로 초기화
  const [selectedBrand, setSelectedBrand] = useState(null); // 초기값은 null

  // 컴포넌트가 처음 렌더링될 때 실행되는 useEffect
  useEffect(() => {
    // 서버에서 "브랜드 전체 목록"을 불러오는 비동기 함수 호출
    fetchBrands();
  }, []);

  // GET 서버에서 "브랜드 전체 목록"을 불러오는 비동기 함수
  const fetchBrands = async () => {
    try {
      // HTTP GET 요청
      const response = await axios.get('/admin/brands');
      // 가져온 데이터의 "content" 배열을 사용하여 브랜드 목록 상태에 설정
      setBrands(response.data.content);
    } catch (error) {
      // 에러 발생 시 에러 메시지 출력
      console.error('Error fetching brands:', error);
    }
  };

  // GET 서버에서 "브랜드 단건 정보"를 불러오는 비동기 함수
  const fetchBrandDetails = async (id) => {
    try {
      // HTTP GET 요청
      const response = await axios.get(`/admin/brand/${id}`);
      // 가져온 데이터를 선택된 브랜드로 설정
      setSelectedBrand(response.data);
    } catch (error) {
      // 에러 발생 시 에러 메시지 출력
      console.error('Error fetching brand details:', error);
    }
  };

  // PUT "브랜드 단건 정보"를 업데이트하는 비동기 함수
  const updateBrand = async () => {
    try {
      // 선택된 브랜드가 없으면 함수 종료
      if (!selectedBrand) return;

      // HTTP PUT 요청
      const response = await axios.put(`/admin/brand/${selectedBrand.id}`, {
        title: selectedBrand.title,
        title_eng: selectedBrand.title_eng,
        description: selectedBrand.description,
        site_url: selectedBrand.site_url,
        image: selectedBrand.image,
        stylepointId: selectedBrand.stylepointId,
      });

      // 업데이트된 브랜드로 브랜드 목록 업데이트하기
      setBrands((prevBrands) =>
        prevBrands.map((brand) => (brand.id === response.data.id ? response.data : brand))
      );
    } catch (error) {
      // 에러 발생 시 에러 메시지 출력
      console.error('Error updating brand:', error);
    }
  };

  // 화면 렌더링 시작
  return (
    <div>
      <h2>Brands</h2>
      <ul>
        {/* 브랜드 목록을 맵핑하여 리스트 항목으로 출력 */}
        {brands.map((brand) => (
          <li key={brand.id}>
            {/* 각 항목의 제목과 설명 표시 */}
            {brand.title} - {brand.description}
            {/* "Details" 버튼 클릭 시 해당 브랜드의 세부 정보 불러오기 */}
            <button onClick={() => fetchBrandDetails(brand.id)}>Details</button>
          </li>
        ))}
      </ul>

      {/* 선택된 브랜드가 있을 경우 아래 내용 출력 */}
      {selectedBrand && (
        <div>
          {/* 선택된 브랜드의 제목, 설명, 이미지 출력 */}
          <h3>Selected Brand: {selectedBrand.title}</h3>
          <p>{selectedBrand.description}</p>
          <img src={selectedBrand.image} alt={selectedBrand.title} />

          {/* 브랜드 편집 섹션 */}
          <h4>Edit Brand</h4>
          {/* 제목 입력 필드: 값이 변경되면 선택된 브랜드 업데이트 */}
          <input
            type="text"
            value={selectedBrand.title}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          {/* 영문 제목 입력 필드: 값이 변경되면 선택된 브랜드 업데이트 */}
          <input
            type="text"
            value={selectedBrand.title_eng}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, title_eng: e.target.value }))
            }
          />
          {/* 설명 입력 필드: 값이 변경되면 선택된 브랜드 업데이트 */}
          <input
            type="text"
            value={selectedBrand.description}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          {/* 사이트 URL 입력 필드: 값이 변경되면 선택된 브랜드 업데이트 */}
          <input
            type="text"
            value={selectedBrand.site_url}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, site_url: e.target.value }))
            }
          />
          {/* 이미지 입력 필드: 값이 변경되면 선택된 브랜드 업데이트 */}
          <input
            type="text"
            value={selectedBrand.image}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, image: e.target.value }))
            }
          />
          {/* 스타일 포인트 ID 입력 필드: 값이 변경되면 선택된 브랜드 업데이트 */}
          <input
            type="text"
            value={selectedBrand.stylepointId}
            onChange={(e) =>
              setSelectedBrand((prev) => ({ ...prev, stylepointId: e.target.value }))
            }
          />
          {/* "Save" 버튼 클릭 시 브랜드 업데이트 함수 호출 */}
          <button onClick={updateBrand}>Save</button>
        </div>
      )}
    </div>
  );
};

// 브랜드 폼 컴포넌트 내보내기
export default BrandForm;
