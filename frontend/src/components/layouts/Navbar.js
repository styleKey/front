import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // CSS Modules를 이용한 스타일 import

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to='/test' className={styles.navLinks}>
          TEST
        </Link>
        <Link to='/style' className={styles.navLinks}>
          STYLE
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
