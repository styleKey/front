import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Point.css';
import { Datas } from './Datas';

function PointNavbar() {
  const location = useLocation();

  return (
    <div className="point-nav">
      <Link className={`point-nav-link ${location.pathname === '/style' ? 'selected' : ''}`} to="/style" >
        전체
      </Link>

      {Datas.map((data) => (
        <Link className={`point-nav-link ${location.pathname.includes(`/style/${data.id}`) ? 'selected' : ''}`} to={`/style/${data.id}`}>
          {data.label}
        </Link>
      ))}
    </div>
  );
}

export default PointNavbar;
