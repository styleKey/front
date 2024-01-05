import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  const [selected, setSelected] = useState(location.pathname);

  useEffect(() => {
    setSelected(location.pathname);
  }, [location]);

  return (
    <div className="navbar">
      <div className="nav_bar">|</div>
      <Link to="/">
        <div
          className={`nav_select ${selected === "/" ? "selected" : ""}`}
          onClick={() => setSelected("/")}
        >
          HOME
        </div>
      </Link>
      <div className="nav_bar">|</div>
      <Link to="/test">
        <div
          className={`nav_select ${selected === "/test" ? "selected" : ""}`}
          onClick={() => setSelected("/test")}
        >
          TEST
        </div>
      </Link>
      <div className="nav_bar">|</div>
      <Link to="/style">
        <div
          className={`nav_select ${selected === "/style" ? "selected" : ""}`}
          onClick={() => setSelected("/style")}
        >
          STYLE
        </div>
      </Link>
      <div className="nav_bar">|</div>
    </div>
  );
}

export default Navbar;
