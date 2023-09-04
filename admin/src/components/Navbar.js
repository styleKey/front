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
          <li><a href="/" className="Nav"> stylepoint </a> </li>
          {stylePoints.map((stylePoint) => (
            <li key={stylePoint.id}>
              <Link to={`/stylepoint/${stylePoint.id}`} className="btn btn-title">{stylePoint.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav >
  );
}

export default Navbar;
