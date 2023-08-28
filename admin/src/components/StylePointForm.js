import React, { useEffect, useState } from 'react';

const API_BASE_URL = 'https://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.io';

function StylePointForm() {
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedStylePoint, setSelectedStylePoint] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
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

  const handleStylePointClick = (stylePoint) => {
    setSelectedStylePoint(stylePoint);
    setTitle(stylePoint.title);
    setDescription(stylePoint.description);
  };

  const handleUpdateStylePoint = async () => {
    try {
      if (!selectedStylePoint) return;
      const updatedData = {
        title,
        description,
      };
      const response = await fetch(`${API_BASE_URL}/admin/stylepoint/${selectedStylePoint.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchStylePoints();
        setError(null);
      } else {
        const errorMessage = `스타일포인트 수정 실패: ${response.status}`;
        setError(errorMessage);
        console.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = `스타일포인트 수정 오류: ${error.message}`;
      setError(errorMessage);
      console.error(errorMessage);
    }
  };

  return (
    <div className="stylepoint-form">
      <header className="stylepoint-header">
        <h2>Style Points</h2>
        {error && <p className="error-message">{error}</p>}
      </header>
      <div className="stylepoint-container">
        <div className="stylepoint-list-card">
          <h3>Style Point List</h3>
          <ul className="stylepoint-list">
            {stylePoints.map((stylePoint) => (
              <li key={stylePoint.id} onClick={() => handleStylePointClick(stylePoint)}>
                {stylePoint.title}
              </li>
            ))}
          </ul>
        </div>
        {selectedStylePoint && (
          <div className="stylepoint-card">
            <h3>Edit Style Point</h3>
            <div className="input-container">
              <label>Title</label>
              <br />
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-container">
              <label>Description</label>
              <br />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <button className="stylepoint-button" onClick={handleUpdateStylePoint}>
              수정
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StylePointForm;
