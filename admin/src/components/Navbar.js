import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Navbar() {
  const [stylePoints, setStylePoints] = useState([]);

  useEffect(() => {
    const fetchStylePoints = async () => {
      try {
        const response = await axios.get('/admin/stylepoints');
        setStylePoints(response.data);
      } catch (error) {
        console.error('Error fetching stylepoints:', error);
      }
    };

    fetchStylePoints();
  }, []);

  return (
    <nav>
      <div>
        <ul>
          <li>
            <Link to="/">
              <img src="/icon_stylekey.ico" alt="StyleKey" className="icon" />
            </Link>
          </li>
          {stylePoints.map((point) => (
            <li key={point.id}>
              <Link to={`/stylepoint/${point.id}`} className="btn btn-title">
                {point.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
