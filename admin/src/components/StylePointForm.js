import React, { useEffect, useState } from 'react';

function StylePointForm() {
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedStylePoint, setSelectedStylePoint] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [coordiLooks, setCoordiLooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStylePoints();
  }, []);

  const fetchStylePoints = async () => {
    try {
      const response = await fetch(`/admin/stylepoints`);
      if (response.ok) {
        const data = await response.json();
        setStylePoints(data);
        setError(null);
      } else {
        handleError('StylePoint 가져오기 실패', response.status);
      }
    } catch (error) {
      handleError('StylePoint 가져오기 오류', error.message);
    }
  };
  
  const fetchCoordiLooks = async (coordiLookIds) => {
    try {
      const response = await fetch(`/admin/coordilooks?ids=${coordiLookIds.join(',')}`);
      if (response.ok) {
        const data = await response.json();
        // Check if data is an array before setting it to the state
        if (Array.isArray(data)) {
          setCoordiLooks(data);
          setError(null);
        } else {
          setCoordiLooks([]); // Set an empty array as a fallback
          setError('코디룩 정보 가져오기 오류: 데이터 형식이 잘못되었습니다.');
        }
      } else {
        handleError('코디룩 정보 가져오기 실패', response.status);
      }
    } catch (error) {
      handleError('코디룩 정보 가져오기 오류', error.message);
    }
  };
  

  const handleError = (message, errorDetail) => {
    const errorMessage = `${message}: ${errorDetail}`;
    setError(errorMessage);
    console.error(errorMessage);
  };

  const handleStylePointClick = async (stylePoint) => {
    setSelectedStylePoint(stylePoint);
    setTitle(stylePoint.title);
    setDescription(stylePoint.description);
    setImage(stylePoint.image);
    await fetchCoordiLooks(stylePoint.coordiLookList.map(coordiLook => coordiLook.id));
  };

  const handleCreateStylePoint = async () => {
    try {
      const newStylePointData = {
        title,
        description,
        image // 이미지 URL도 포함하여 보냅니다.
      };
      const response = await fetch(`/admin/stylepoint/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStylePointData),
      });
      if (response.ok) {
        fetchStylePoints();
        setError(null);
      } else {
        handleError('StylePoint 등록 실패', response.status);
      }
    } catch (error) {
      handleError('StylePoint 등록 오류', error.message);
    }
  };

  const handleUpdateStylePoint = async () => {
    try {
      if (!selectedStylePoint) return;
      const updatedData = {
        title,
        description,
        image // 이미지 URL도 포함하여 보냅니다.
      };
      const response = await fetch(`/admin/stylepoint/${selectedStylePoint.id}`, {
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
        handleError('StylePoint 수정 실패', response.status);
      }
    } catch (error) {
      handleError('StylePoint 수정 오류', error.message);
    }
  };

  return (
    <div className="form">
      <header className="header">
        <h2>Style Point</h2>
        {error && <p className="error-message">{error}</p>}
      </header>
      <div className="container">
        <div className="list-card">
          <h3>Style Point List</h3>
          <ul className="list">
            {stylePoints.map((stylePoint) => (
              <li key={stylePoint.id} onClick={() => handleStylePointClick(stylePoint)}>
                {stylePoint.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h3>{selectedStylePoint ? 'Update Style Point' : 'Create Style Point'}</h3>
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
          <div className="input-container">
            <label>Image URL</label>
            <br />
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
          </div>
          {selectedStylePoint ? (
            <button className="button" onClick={handleUpdateStylePoint}>Update Style Point</button>
          ) : (
            <button className="button" onClick={handleCreateStylePoint}>Create Style Point</button>
          )}
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h3>Style Point Details</h3>
          {selectedStylePoint && (
            <div>
              <p><strong>Title:</strong> {selectedStylePoint.title}</p>
              <p><strong>Description:</strong> {selectedStylePoint.description || 'NULL'}</p>
              <p><strong>Image:</strong> <img src={selectedStylePoint.image} alt="Style Point" /></p>

              <h4>Coordi Looks:</h4>
              <ul>
                {coordiLooks.map((coordiLook) => (
                  <li key={coordiLook.id}>{coordiLook.name || 'NULL'}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StylePointForm;