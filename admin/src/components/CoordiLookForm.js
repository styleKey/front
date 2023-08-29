import React, { useEffect, useState } from 'react';

function CoordiLookForm() {
  const [stylePoints, setStylePoints] = useState([]);
  const [coordiLooks, setCoordiLooks] = useState({ content: [] });
  const [selectedCoordiLook, setSelectedCoordiLook] = useState(null);
  const [selectedStylePoint, setSelectedStylePoint] = useState(null);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStylePoints();
    fetchCoordiLooks();
    fetchItems();
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

  const fetchCoordiLooks = async () => {
    try {
      const response = await fetch(`/admin/coordilooks`);
      if (response.ok) {
        const data = await response.json();
        setCoordiLooks(data);
        setError(null);
      } else {
        handleError('CoordiLook 가져오기 실패', response.status);
      }
    } catch (error) {
      handleError('CoordiLook 가져오기 오류', error.message);
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch(`/admin/items`);
      if (response.ok) {
        const data = await response.json();
        setItems(data.items); // Assuming that the items are within the 'items' property of the response data
        setError(null);
      } else {
        handleError('Items 가져오기 실패', response.status);
      }
    } catch (error) {
      handleError('Items 가져오기 오류', error.message);
    }
  };
  

  const handleError = (message, errorDetail) => {
    const errorMessage = `${message}: ${errorDetail}`;
    setError(errorMessage);
    console.error(errorMessage);
  };

  const handleStylePointSelect = (stylePoint) => {
    setSelectedStylePoint(stylePoint);
  };

  const handleCoordiLookClick = (coordiLook) => {
    setSelectedCoordiLook(coordiLook);
    setTitle(coordiLook.title);
    setImage(coordiLook.image);
    setSelectedStylePoint(stylePoints.find((point) => point.id === coordiLook.stylepointId));
    setSelectedItems(items.filter((item) => coordiLook.items.includes(item.id)));
  };

  const handleCreateCoordiLook = async () => {
    try {
      const newCoordiLookData = {
        stylepointId: selectedStylePoint.id,
        title: title,
        image: image,
        items: selectedItems.map((item) => item.id),
      };
      const response = await fetch(`/admin/coordilook/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCoordiLookData),
      });
      if (response.ok) {
        fetchCoordiLooks();
        setError(null);
      } else {
        handleError('CoordiLook 등록 실패', response.status);
      }
    } catch (error) {
      handleError('CoordiLook 등록 오류', error.message);
    }
  };

  const handleUpdateCoordiLook = async () => {
    try {
      if (!selectedCoordiLook || !selectedStylePoint) return;
      const updatedData = {
        stylepointId: selectedStylePoint.id,
        title: title,
        image: image,
        items: selectedItems.map((item) => item.id),
      };
      const response = await fetch(`/admin/coordilook/${selectedCoordiLook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchCoordiLooks();
        setSelectedCoordiLook(null);
        setError(null);
      } else {
        handleError('CoordiLook 수정 실패', response.status);
      }
    } catch (error) {
      handleError('CoordiLook 수정 오류', error.message);
    }
  };

  const handleDeleteCoordiLook = async () => {
    try {
      if (!selectedCoordiLook) return;
      const response = await fetch(`/admin/coordilook/${selectedCoordiLook.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchCoordiLooks();
        setSelectedCoordiLook(null);
        setError(null);
      } else {
        handleError('CoordiLook 삭제 실패', response.status);
      }
    } catch (error) {
      handleError('CoordiLook 삭제 오류', error.message);
    }
  };

  return (
    <div className="form">
      <header className="header">
        <h2>CoordiLook</h2>
        {error && <p className="error-message">{error}</p>}
      </header>
      <div className="container">
        <div className="list-card">
          <h3>CoordiLook List</h3>
          <ul className="list">
            {coordiLooks.content.length > 0 ? (
              coordiLooks.content.map((coordiLook) => (
                <li key={coordiLook.id} onClick={() => handleCoordiLookClick(coordiLook)}>
                  {coordiLook.title}
                </li>
              ))
            ) : (
              <li>No CoordiLooks available.</li>
            )}
          </ul>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <h3>{selectedCoordiLook ? 'Update CoordiLook' : 'Create CoordiLook'}</h3>
          <div className="input-container">
            <label>Style Point</label>
            <br />
            <select
              value={selectedStylePoint ? selectedStylePoint.id : ''}
              onChange={(e) =>
                handleStylePointSelect(stylePoints.find((point) => point.id === parseInt(e.target.value)))
              }
            >
              <option value="">스타일 포인트 선택</option>
              {stylePoints.map((point) => (
                <option key={point.id} value={point.id}>
                  {point.title}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <label>Title</label>
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>
          <div className="input-container">
            <label>Image URL</label>
            <br />
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
            />
          </div>
          <div className="input-container">
            <label>Items</label>
            <br />
            <select
              multiple
              value={selectedItems.map((item) => item.id)}
              onChange={(e) =>
                setSelectedItems(
                  Array.from(e.target.selectedOptions, (option) =>
                    items.find((item) => item.id === parseInt(option.value))
                  )
                )
              }
            >
              {items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          {selectedCoordiLook ? (
            <>
              <button className="button" onClick={handleUpdateCoordiLook}>
                Update CoordiLook
              </button>
              <button className="button" onClick={handleDeleteCoordiLook}>
                Delete CoordiLook
              </button>
            </>
          ) : (
            <button className="button" onClick={handleCreateCoordiLook}>
              Create CoordiLook
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoordiLookForm;
