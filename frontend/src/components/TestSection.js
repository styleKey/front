import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TestSection.module.css'; // CSS Modules를 이용한 스타일 import

function TestSection() {
  return (
    <div className={styles.testContainer}>
      <h1>나의 애매한<br />패션 취향,<br />확실하게 알고 싶다면?</h1>
      <p>당신의 패션을 분석하고<br />취향에 맞는 브랜드와 코디를 추천합니다.</p>
      <Link to='/test' className={styles.btns}>START</Link>
    </div>
  );
}

export default TestSection;
