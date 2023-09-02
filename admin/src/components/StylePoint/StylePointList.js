import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StylePointTableRow from './StylePointTableRow';
import StylePointTable from './StylePointTable';

const StylePointList = () => {
  const [stylePoints, setStylePoints] = useState([]);

  useEffect(() => {
    const fetchStylePoints = async () => {
      try {
        const response = await axios.get('/admin/stylepoints');
        setStylePoints(response.data);
      } catch (error) {
        console.error('Error fetching stylepoints:', error);
      }
    };
    fetchStylePoints();
  }, []);

  return (
    <div>
      <h2>stylepoints</h2>
      <table>
        <thead>
          <StylePointTableRow />
        </thead>
        <tbody>
          {stylePoints && stylePoints.map((stylePoint) => (
            <StylePointTable key={stylePoint.id} stylePoint={stylePoint} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StylePointList;
