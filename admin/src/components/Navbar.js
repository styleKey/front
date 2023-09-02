import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav>
      <div>
        <div>
          <a href="/">
          stylepoint
          </a>
        </div>
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
