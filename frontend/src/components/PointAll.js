import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Datas } from './Datas';

import './Point.css';

function PointCards() {
  const [selectedLabel, setSelectedLabel] = useState(null);

  const handleLabelSelect = (label) => {
    setSelectedLabel(label);
  };

  // Filter the data based on the selected label
  const filteredData = selectedLabel
    ? Datas.filter((datas) => datas.label === selectedLabel)
    : Datas;

  return (
    <div className="all">
      {filteredData.map((datas) => (
        <Link className="all-card" to={`/style/${datas.id}`} key={datas.id}>
            <img className="all-img" src={`images/point-${datas.id}/main.png`} alt={datas.label} />
            <div className="all-info">
              <h5 className="all-label">{datas.label}</h5>
              <p className="all-labelDescription">{datas.labelDescription}</p>
            </div>
        </Link>
      ))}
    </div>
  );
}

export default PointCards;
