import React from 'react';
import './Point.css';

function PointLookName({ data }) {
  return (
    <div className="lookName">
      {data.styles.map((style, index) => (
        <div className="look" key={style.lookName}>
          <div className="look-text">{style.lookName}</div>
          <img
            className="look-img"
            src={`../images/point-${data.id}/look-${index + 1}.png`}
            alt={style.lookName}
          />
        </div>
      ))}
    </div>
  );
}

export default PointLookName;
