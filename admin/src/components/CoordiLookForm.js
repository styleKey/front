import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoordiLookForm = () => {
  const [coordiLooks, setCoordiLooks] = useState([]);
  const [selectedCoordiLook, setSelectedCoordiLook] = useState(null);
  const [showItemInput, setShowItemInput] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  
  useEffect(() => {
    fetchCoordiLooks();
  }, []);

  const fetchCoordiLooks = async () => {
    try {
      const response = await axios.get('/admin/coordilooks'); // Replace with the actual API endpoint
      setCoordiLooks(response.data);
    } catch (error) {
      console.error('Error fetching coordi looks:', error);
    }
  };

  const handleCoordiLookClick = async (coordiLookId) => {
    try {
      const response = await axios.get(`/admin/coordilook/${coordiLookId}`); // Replace with the actual API endpoint
      setSelectedCoordiLook(response.data);
    } catch (error) {
      console.error('Error fetching coordi look details:', error);
    }
  };

  const handleItemInputToggle = () => {
    setShowItemInput(!showItemInput);
  };

  const handleItemTitleChange = (event) => {
    setNewItemTitle(event.target.value);
  };

  const handleItemSubmit = async () => {
    try {
      const response = await axios.post(`/admin/coordilook/${selectedCoordiLook.id}/addItem`, {
        title: newItemTitle,
      }); // Replace with the actual API endpoint
      setSelectedCoordiLook(response.data);
      setNewItemTitle('');
    } catch (error) {
      console.error('Error adding item to coordi look:', error);
    }
  };

  const handleCoordiLookUpdate = async () => {
    try {
      const response = await axios.put(`/admin/coordilook/${selectedCoordiLook.id}`, {
        // Updated coordi look data
      }); // Replace with the actual API endpoint
      setSelectedCoordiLook(response.data);
    } catch (error) {
      console.error('Error updating coordi look:', error);
    }
  };

  const handleCoordiLookDelete = async () => {
    try {
      await axios.delete(`/admin/coordilook/${selectedCoordiLook.id}`); // Replace with the actual API endpoint
      setSelectedCoordiLook(null);
      fetchCoordiLooks(); // Refresh the coordi looks list
    } catch (error) {
      console.error('Error deleting coordi look:', error);
    }
  };

  return (
    <div>
      <h2>Coordi Look Management</h2>
      <div className="coordi-looks-list">
        {coordiLooks.map((coordiLook) => (
          <div key={coordiLook.id} onClick={() => handleCoordiLookClick(coordiLook.id)}>
            {coordiLook.title}
          </div>
        ))}
      </div>
      {selectedCoordiLook && (
        <div className="coordi-look-details">
          {/* Display coordi look details */}
          {selectedCoordiLook.items.map((item) => (
            <div key={item.id}>
              {item.title}
            </div>
          ))}
          <button onClick={handleItemInputToggle}>Add Item</button>
          {showItemInput && (
            <div>
              <input type="text" value={newItemTitle} onChange={handleItemTitleChange} />
              <button onClick={handleItemSubmit}>Submit</button>
            </div>
          )}
          <button onClick={handleCoordiLookUpdate}>Update</button>
          <button onClick={handleCoordiLookDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default CoordiLookForm;
