import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState('');

  const isStylePathSelected = location.pathname.startsWith('/style');

  return (
    <>
      <div className='nav'>
        <Link
          className={`nav-links ${location.pathname === '/test' ? 'selected' : ''}`}
          to='/test'
          onClick={() => setSelectedMenu('test')}
        >
          Test
        </Link>
        <span className='nav-divider'></span>
        <Link
          className={`nav-links ${isStylePathSelected ? 'selected' : ''}`}
          to='/style'
          onClick={() => setSelectedMenu('style')}
        >
          Style
        </Link>
        <span className='nav-divider'></span>
      </div>
    </>
  );
}

export default Navbar;
