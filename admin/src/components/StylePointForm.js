import React, { useEffect, useState } from 'react';

function StylePointForm() {
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedStylePoint, setSelectedStylePoint] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/admin/stylepoints', {
        headers: {
          'Cache-Control': 'no-cache'
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStylePoints(data);
        setError(null);
      } else {
        setError(`Fetch style points failed with status: ${response.status}`);
        console.error(`Fetch style points failed with status: ${response.status}`);
      }
    } catch (error) {
      setError(`Fetch style points error: ${error.message}`);
      console.error(`Fetch style points error: ${error.message}`);
    }
  };


  const handleStylePointClick = async (id) => {
    try {
      const response = await fetch(`/admin/stylepoint/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedStylePoint(data);
        setUpdatedTitle(data.stylePoint.title);
        setUpdatedDescription(data.stylePoint.description);
        setError(null); // 성공 시 에러 초기화
      } else {
        setError(`Fetch style point by ID failed with status: ${response.status}`);
        console.error(`Fetch style point by ID failed with status: ${response.status}`);
      }
    } catch (error) {
      setError(`Fetch style point by ID error: ${error.message}`);
      console.error(`Fetch style point by ID error: ${error.message}`);
    }
  };

  const handleUpdateClick = async () => {
    try {
      if (!selectedStylePoint) return;
      const updatedData = {
        title: updatedTitle,
        description: updatedDescription,
      };
      const response = await fetch(`/admin/stylepoint/${selectedStylePoint.stylePoint.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedStylePoint = await response.json();
        fetchData(); // 수정 완료 후 작업 처리
        setError(null); // 성공 시 에러 초기화
      } else {
        setError(`Update style point failed with status: ${response.status}`);
        console.error(`Update style point failed with status: ${response.status}`);
      }
    } catch (error) {
      setError(`Update style point error: ${error.message}`);
      console.error(`Update style point error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Style Points</h2>
      {/* 에러 메시지 출력 */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {stylePoints.map((stylePoint) => (
          <li key={stylePoint.id} onClick={() => handleStylePointClick(stylePoint.id)}>
            {stylePoint.title}
          </li>
        ))}
      </ul>
      {selectedStylePoint && (
        <div>
          <h3>Selected Style Point</h3>
          <p>Title: {selectedStylePoint.stylePoint.title}</p>
          <p>Description: {selectedStylePoint.stylePoint.description}</p>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <button onClick={handleUpdateClick}>Update</button>
        </div>
      )}
    </div>
  );
}

export default StylePointForm;
