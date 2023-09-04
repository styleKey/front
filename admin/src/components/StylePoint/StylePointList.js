import React, { useState, useEffect } from 'react';
import getData from '../../api/getData';
import { StylePointTableMap } from './StylePointTable';

const StylePointList = () => {
  const [stylePoints, setStylePoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData('stylepoints');
      if (data) {
        setStylePoints(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>stylepoints</h1>
      <StylePointTableMap stylePoints={stylePoints} />
    </div>
  );
};

export default StylePointList;
