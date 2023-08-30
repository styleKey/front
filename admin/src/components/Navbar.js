import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav>
      <div>
        <div>
          <a href="/">
            Admin Panel
          </a>
        </div>
        <ul>
          <li >
            <a href="/admin/stylepoints">
            stylepoint
            </a>
          </li>
          <li>
            <a href="/admin/brands">
            brands
            </a>
          </li>
          <li >
            <a href="/admin/coordilooks">
            coordilooks
            </a>
          </li>
          <li >
            <a href="/admin/items">
            items
            </a>
          </li>
        </ul>
      </div>
    </nav >
  );
}

export default Navbar;
