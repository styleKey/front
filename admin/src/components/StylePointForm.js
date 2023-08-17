import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 스타일 포인트 폼 컴포넌트 정의
const StylePointForm = () => {
  // 상태 변수 선언: 스타일 포인트 목록과 선택된 스타일 포인트
  const [stylePoints, setStylePoints] = useState([]); // 빈 배열로 초기화
  const [selectedStylePoint, setSelectedStylePoint] = useState(null); // 초기값은 null

  // 컴포넌트가 처음 렌더링될 때 실행되는 useEffect
  useEffect(() => {
    // 서버에서 "스타일 포인트 전체 목록"을 불러오는 비동기 함수 호출
    fetchStylePoints();
  }, []);

  // GET 서버에서 "스타일 포인트 전체 목록"을 불러오는 비동기 함수
  const fetchStylePoints = async () => {
    try {
      // HTTP GET 요청
      const response = await axios.get('/admin/stylepoints');
      // 가져온 데이터를 스타일 포인트 목록 상태에 설정
      setStylePoints(response.data);
    } catch (error) {
      // 에러 발생 시 에러 메시지 출력
      console.error('Error fetching style points:', error);
    }
  };

  // GET 서버에서 "스타일 포인트 단건 정보"를 불러오는 비동기 함수
  const fetchStylePointDetails = async (id) => {
    try {
      // HTTP GET 요청
      const response = await axios.get(`/admin/stylepoint/${id}`); // 업데이트된 상대 경로
      // 가져온 데이터에서 "stylePoint" 정보를 선택된 스타일 포인트로 설정
      setSelectedStylePoint(response.data.stylePoint);
    } catch (error) {
      // 에러 발생 시 에러 메시지 출력
      console.error('Error fetching style point details:', error);
    }
  };

  // PUT "스타일 포인트 단건 정보"를 업데이트하는 비동기 함수
  const updateStylePoint = async () => {
    try {
      // 선택된 스타일 포인트가 없으면 함수 종료
      if (!selectedStylePoint) return;

      // HTTP PUT 요청
      const response = await axios.put(`/admin/stylepoint/${selectedStylePoint.id}`, {
        title: selectedStylePoint.title,
        description: selectedStylePoint.description,
        image: selectedStylePoint.image,
      }); // 업데이트된 상대 경로

      // 업데이트된 스타일 포인트로 스타일 포인트 목록 업데이트하기
      setStylePoints((prevStylePoints) =>
        prevStylePoints.map((point) => (point.id === response.data.id ? response.data : point))
      );
    } catch (error) {
      // 에러 발생 시 에러 메시지 출력
      console.error('Error updating style point:', error);
    }
  };

  // 화면 렌더링 시작
  return (
    <div>
      <h2>Style Points</h2>
      <ul>
        {/* 스타일 포인트 목록을 맵핑하여 리스트 항목으로 출력 */}
        {stylePoints.map((point) => (
          <li key={point.id}>
            {/* 각 항목의 제목과 설명 표시 */}
            {point.title} - {point.description}
            {/* "Details" 버튼 클릭 시 해당 스타일 포인트의 세부 정보 불러오기 */}
            <button onClick={() => fetchStylePointDetails(point.id)}>Details</button>
          </li>
        ))}
      </ul>

      {/* 선택된 스타일 포인트가 있을 경우 아래 내용 출력 */}
      {selectedStylePoint && (
        <div>
          {/* 선택된 스타일 포인트의 제목, 설명, 이미지 출력 */}
          <h3>Selected Style Point: {selectedStylePoint.title}</h3>
          <p>{selectedStylePoint.description}</p>
          <img src={selectedStylePoint.image} alt={selectedStylePoint.title} />

          {/* 스타일 포인트 편집 섹션 */}
          <h4>Edit Style Point</h4>
          {/* 제목 입력 필드: 값이 변경되면 선택된 스타일 포인트 업데이트 */}
          <input
            type="text"
            value={selectedStylePoint.title}
            onChange={(e) =>
              setSelectedStylePoint((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          {/* 설명 입력 필드: 값이 변경되면 선택된 스타일 포인트 업데이트 */}
          <input
            type="text"
            value={selectedStylePoint.description}
            onChange={(e) =>
              setSelectedStylePoint((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          {/* 이미지 입력 필드: 값이 변경되면 선택된 스타일 포인트 업데이트 */}
          <input
            type="text"
            value={selectedStylePoint.image}
            onChange={(e) =>
              setSelectedStylePoint((prev) => ({ ...prev, image: e.target.value }))
            }
          />
          {/* "Save" 버튼 클릭 시 스타일 포인트 업데이트 함수 호출 */}
          <button onClick={updateStylePoint}>Save</button>
        </div>
      )}
    </div>
  );
};

// 스타일 포인트 폼 컴포넌트 내보내기
export default StylePointForm;
