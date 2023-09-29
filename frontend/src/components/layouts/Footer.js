import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css'; // CSS Modules를 이용한 스타일 import

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerLinks}>
        <div className={styles.footerLinkWrapper}>
          <div className={styles.footerLinkItems}>
            <Link to='/' className={styles.logoHome}>
              <img src={process.env.PUBLIC_URL + '/logo192.png'} alt='StyleKey' className={styles.logoIcon} />
              StyleKEY
            </Link>
          </div>
          <div className={styles.footerLinkItems}>
            <div className={styles.socialIcons}>
              {/* social icon links */}
            </div>
          </div>
          <div className={styles.footerLinkWrapper}>
            <div className={styles.footerLinkItems}>
              <small className={styles.websiteRights}>THEKEY © 2023</small>
              {/* 다른 링크들 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
