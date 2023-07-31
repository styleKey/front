import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

function Header() {
  return (
    <header className='header'>
      <div className='header-left'> {/* 로고를 담는 컨테이너 */}
        <Link className='header-logo' to='/'>
          <img className='header-logo-image' src='./images/logo.svg' alt='Logo' />
        </Link>
      </div>

      <div className='header-right'> {/* 소셜 링크와 사인업 버튼을 담는 컨테이너 */}
        <div className='social-icons'>
          <Link className='social-icon-link instagram' to='/' target='_blank' aria-label='Instagram'>
            <i class="fab fa-instagram fa-lg"></i>
          </Link>
          <Link className='social-icon-link twitter' to='/' target='_blank' aria-label='Twitter'>
            <i className="fab fa-twitter fa-lg"></i>
          </Link>
        </div>

        <Link className='login-button' to='/login'>Log in</Link>
      </div>
    </header>
  );
}

export default Header;
