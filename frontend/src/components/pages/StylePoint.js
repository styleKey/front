import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';


export default function LookBook() {

  return (
    <>
      <Link to='/sign-up' className='btns'> 유니트 포인트 </Link>
      <Link to='/sign-up' className='btns'> 스트릿 포인트 </Link>
      <Link to='/sign-up' className='btns'> 모던 포인트 </Link>
      <Link to='/sign-up' className='btns'> 노멀 포인트 </Link>
      <Link to='/sign-up' className='btns'> 러블리 포인트 </Link>
      <Link to='/sign-up' className='btns'> 레트로 포인트 </Link>
      <Link to='/sign-up' className='btns'> 글렘 포인트 </Link>
      <Link to='/sign-up' className='btns'> 액티브 포인트 </Link>
    </>
  );
}
