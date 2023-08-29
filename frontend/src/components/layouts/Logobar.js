import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Logobar.module.css'; // CSS Modules를 이용한 스타일 import

function Logobar() {
  return (
    <div className={styles.logobar}>
      <Link to='/' className={styles.logoHome}>
        <img src={process.env.PUBLIC_URL + '/logo192.png'} alt='StyleKey' className={styles.logoIcon} />
        StyleKEY
      </Link>
      <Link to='/sign-up' className={styles.logoSignup}>회원가입</Link>
    </div>
  );
}

export default Logobar;
