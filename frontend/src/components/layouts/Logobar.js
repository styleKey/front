import React from 'react';
import { Link } from 'react-router-dom';

function Logobar() {
  return (
    <div>
      <Link to='/'>
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt='StyleKEY' />
        StyleKEY
      </Link>
      <Link to='/sign-up'>회원가입</Link>
    </div>
  );
}

export default Logobar;
