import React from 'react';
import { Route, Routes } from 'react-router-dom';
import '../../App.css';

import { Datas } from '../Datas';

import PointNavbar from '../PointNavbar';
import PointAll from '../PointAll';
import PointBrand from '../PointBrand';
import PointlookName from '../PointlookName';

export default function Style() {
  return (
    <>
      <PointNavbar />

      <Routes>
        <Route path="/" element={<PointAll />} />
        {Datas.map(data => (
          <Route
            key={data.id}
            path={`/${data.id}`}
            element={
              <>
                <PointBrand data={data} />
                <PointlookName data={data} />
              </>
            }
          />
        ))}
      </Routes>
    </>
  );
}
