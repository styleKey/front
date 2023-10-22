import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className="footer-logo">
        <Link to='/'>
          <img src={process.env.PUBLIC_URL + '/logo192.png'} alt='StyleKEY' />
          StyleKEY
        </Link>
      </div>
      <div className="social-links">
        {/* Social icon links */}
      </div>
      <div className="other-links">
        {/* 다른 링크들 */}
        <small>THEKEY © 2023</small>
      </div>
    </footer>
  );
}

export default Footer;
