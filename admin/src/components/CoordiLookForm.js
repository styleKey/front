import React, { useState, useEffect } from 'react';

function CoordiLookForm() {
  const [coordiLooks, setCoordiLooks] = useState([]);
  const [selectedCoordiLook, setSelectedCoordiLook] = useState(null);
  const [stylePoints, setStylePoints] = useState([]);
  const [selectedStylePoint, setSelectedStylePoint] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [error, setError] = useState(null); // Add state for error messages

  useEffect(() => {
    fetchCoordiLooks();
  }, []);

  const fetchCoordiLooks = async () => {
    try {
      const response = await fetch('https://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.io/admin/coordilooks');
      const data = await response.json();
      setCoordiLooks(data);
      setError(null); // Clear error on successful fetch
    } catch (error) {
      setError('Fetch coordi looks error: ' + error.message);
    }
  };

  const handleCoordiLookClick = (coordiLook) => {
    setSelectedCoordiLook(coordiLook);
    setSelectedStylePoint(coordiLook.stylePointId);
    setSelectedItems(coordiLook.items.map(item => item.id));
  };

  const handleUpdateCoordiLook = async () => {
    try {
      if (!selectedCoordiLook) return;
      const updatedData = {
        stylePointId: selectedStylePoint,
        itemIds: selectedItems,
      };
      // Update coordi look data using API
      const response = await fetch(`https://bd59a4ce-26a1-451d-b3e0-8cd31bcfd682.mock.pstmn.io/admin/coordilook/${selectedCoordiLook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      const updatedCoordiLook = await response.json();
      // Handle updated coordi look, e.g., refetch data
      fetchCoordiLooks();
    } catch (error) {
      console.error('Update coordi look error:', error);
    }
  };

  return (
    <div>
      <h2>Coordi Look Management</h2>
      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Coordi Look Management</h2>
        <div>
          <div>
            <h3>Coordi Look List</h3>
            <ul>
              {coordiLooks.map((coordiLook) => (
                <li key={coordiLook.id} onClick={() => handleCoordiLookClick(coordiLook)}>
                  Coordi Look {coordiLook.id}
                </li>
              ))}
            </ul>
          </div>
          {selectedCoordiLook && (
            <div>
              <h3>Edit Coordi Look</h3>
              <div>
                <label>Select Style Point:</label>
                <select value={selectedStylePoint} onChange={(e) => setSelectedStylePoint(e.target.value)}>
                  <option value="">Select a style point</option>
                  {stylePoints.map((stylePoint) => (
                    <option key={stylePoint.id} value={stylePoint.id}>{stylePoint.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label>Select Items:</label>
                <select multiple value={selectedItems} onChange={(e) => setSelectedItems(Array.from(e.target.selectedOptions, option => option.value))}>
                  {items.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleUpdateCoordiLook}>Update Coordi Look</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CoordiLookForm;
