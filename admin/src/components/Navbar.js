import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../styles/Navbar.css';

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
        <div>
          <a href="/">
            stylepoint
          </a>
        </div>

        <ul>
          {stylePoints.map((stylePoint) => (
            <li key={stylePoint.id}>
              <Link to={`/stylepoint/${stylePoint.id}`} className="btn btn-title">{stylePoint.title}</Link>
            </li>
          ))}
        </ul>

        <ul>
          <li>
            <a href="/brands">
              brands
            </a>
          </li>
          <li >
            <a href="/coordilooks">
              coordilooks
            </a>
          </li>
          <li >
            <a href="/items">
              items
            </a>
          </li>
          <li >
            <a href="/categories">
              categories
            </a>
          </li>
        </ul>
      </div>
    </nav >
  );
}

export default Navbar;
