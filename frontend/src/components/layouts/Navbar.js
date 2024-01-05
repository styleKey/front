import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [selected, setSelected] = useState("HOME"); // 'HOME'을 기본 선택 상태로 설정

  const handleMenuClick = (menu) => {
    setSelected(menu);
  };

  // 마우스 호버 상태를 추적할 필요가 없으므로 관련 상태와 함수를 제거합니다

  const homeTextColor = selected === "HOME" ? "black" : "gray";
  const styleTextColor = selected === "STYLE" ? "black" : "gray";

  return (
    <div className="navbar">
      <div className="nav_bar">|</div>
      <div
        className="nav_select"
        onClick={() => handleMenuClick("HOME")} // 클릭 이벤트 핸들러 추가
        style={{ color: homeTextColor }}
      >
        HOME
      </div>
      <div className="nav_bar">|</div>
      <div
        className="nav_select"
        onClick={() => handleMenuClick("STYLE")} // 클릭 이벤트 핸들러 추가
        style={{ color: styleTextColor }}
      >
        STYLE
      </div>
      <div className="nav_bar">|</div>
    </div>
  );
}

export default Navbar;
