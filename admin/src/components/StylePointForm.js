import React, { useState, useEffect } from 'react';
import axios from 'axios';

// StylePointForm 컴포넌트 정의
const StylePointForm = () => {
  // 상태 변수 선언: stylePoints과 selectedStylePoint
  const [stylePoints, setStylePoints] = useState([]); // 빈 배열로 초기화
  const [selectedStylePoint, setSelectedStylePoint] = useState(null); // 초기값은 null

  // 컴포넌트가 처음 렌더링될 때 실행되는 useEffect
  useEffect(() => {
    // 서버에서 "StylePoint 전체 목록"을 불러오는 비동기 함수 호출
    fetchStylePoints();
  }, []);

  // GET 서버에서 "StylePoint 전체 목록"을 불러오는 비동기 함수
  const fetchStylePoints = async () => {
    try {
      // HTTP GET 요청
      const response = await axios.get('/admin/stylepoints');
      // 가져온 데이터를 stylePoints 상태에 설정
      setStylePoints(response.data);
    } catch (error) {
      // 에러 발생 시 에러 메시지 출력
      console.error('Error fetching style points:', error);
    }
  };

  // GET 서버에서 "StylePoint 단건 정보"를 불러오는 비동기 함수
  const fetchStylePointDetails = async (id) => {
    try {
      // HTTP GET 요청
      const response = await axios.get(`/admin/stylepoint/${id}`);
      // 가져온 데이터에서 "stylePoint" 정보를 SelectedStylePoint로 설정
      setSelectedStylePoint(response.data.stylePoint);
    } catch (error) {
      // 에러 발생 시 에러 메시지 출력
      console.error('Error fetching style point details:', error);
    }
  };

  // PUT "StylePoint 단건 정보"를 업데이트하는 비동기 함수
  const updateStylePoint = async () => {
    try {
      // selectedStylePoint가 없으면 함수 종료
      if (!selectedStylePoint) return;

      // HTTP PUT 요청
      const response = await axios.put(`/admin/stylepoint/${selectedStylePoint.id}`, {
        title: selectedStylePoint.title,
        description: selectedStylePoint.description,
        image: selectedStylePoint.image,
      });

      // 업데이트된 StylePoint로 StylePoints 목록 업데이트하기
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
        {/* StylePoints 목록을 맵핑하여 리스트 항목으로 출력 */}
        {stylePoints.map((point) => (
          <li key={point.id}>
            {/* 각 항목의 title과 description 표시 */}
            {point.title} - {point.description}
            {/* "Details" 버튼 클릭 시 해당 StylePoint 단건 정보 불러오기 */}
            <button onClick={() => fetchStylePointDetails(point.id)}>Details</button>
          </li>
        ))}
      </ul>

      {/* selectedStylePoint가 있을 경우 아래 내용 출력 */}
      {selectedStylePoint && (
        <div>
          {/* selectedStylePoint의 title, description, image 출력 */}
          <h3>Selected Style Point: {selectedStylePoint.title}</h3>
          <p>{selectedStylePoint.description}</p>
          <img src={selectedStylePoint.image} alt={selectedStylePoint.title} />

          {/* StylePoint 편집 섹션 */}
          <h4>Edit Style Point</h4>
          {/* title 입력 필드: 값이 변경되면 selectedStylePoint 업데이트 */}
          <input
            type="text"
            value={selectedStylePoint.title}
            onChange={(e) =>
              setSelectedStylePoint((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          {/* description 입력 필드: 값이 변경되면 selectedStylePoint 업데이트 */}
          <input
            type="text"
            value={selectedStylePoint.description}
            onChange={(e) =>
              setSelectedStylePoint((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          {/* image 입력 필드: 값이 변경되면 selectedStylePoint 업데이트 */}
          <input
            type="text"
            value={selectedStylePoint.image}
            onChange={(e) =>
              setSelectedStylePoint((prev) => ({ ...prev, image: e.target.value }))
            }
          />
          {/* "Save" 버튼 클릭 시 StylePoint 업데이트 함수 호출 */}
          <button onClick={updateStylePoint}>Save</button>
        </div>
      )}
    </div>
  );
};

// StylePointForm 컴포넌트 내보내기
export default StylePointForm;
