import React from 'react';
import { Link } from 'react-router-dom';

import '../../App.css';
import './Test.css';

export default function Test() {
  return (
    <>
      <div className='teststart'>

        <video src='/videos/video-1.mp4' autoPlay loop muted />

        <div className='teststart-text'>
          <div className='teststart-h1'>나의 애매한 <br /> 패션 취향,  <br />확실하게 알고 싶다면?</div>
          <div className='teststart-p'>당신의 패션을 분석하고<br /> 취향에 맞는 브랜드와 코디를 추천합니다.</div>
        </div>

        <Link className='teststart-button' to='/test' >STARTED </Link>

      </div >
    </>
  );
}