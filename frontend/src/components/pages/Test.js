import React, { useState } from "react";
import "./Test.css";
import image1 from "../dummyicon/1.jpg";
import image2 from "../dummyicon/2.jpg";
import image3 from "../dummyicon/3.jpg";
import image4 from "../dummyicon/4.png";

function Test() {
  const [value, setValue] = useState(1); // 현재 값을 상태로 관리
  const max = 11; // 최대값

  const completedWidth = ((value - 1) / (max - 1)) * 100;
  const thumbLeft = ((value - 1) / (max - 1)) * 100;

  return (
    <div className="test">
      <div className="slider-container">
        <button
          onClick={() => setValue(value > 1 ? value - 1 : 1)}
          disabled={value === 1}
        >
          &lt;
        </button>
        <div className="slider-bar">
          <div className="slider-thumb" style={{ left: `${thumbLeft}%` }}>
            {value}
          </div>
          <div
            className="slider-completed"
            style={{ width: `${completedWidth}%` }}
          ></div>
        </div>
        <button
          onClick={() => setValue(value < max ? value + 1 : max)}
          disabled={value === max}
        >
          &gt;
        </button>
      </div>
      <div className="test_question">평소 여가 시간에 가장 많이 하는 것</div>
      <div className="test_images">
        <div className="item">
          <img src={image1} className="dummy" alt="1" />
          <div>게임</div>
        </div>
        <div className="item">
          <img src={image2} className="dummy" alt="2" />
          <div>잠자기</div>
        </div>
        <div className="item">
          <img src={image3} className="dummy" alt="3" />
          <div>운동</div>
        </div>
        <div className="item">
          <img src={image4} className="dummy" alt="4" />
          <div>독서</div>
        </div>
      </div>
    </div>
  );
}

export default Test;
