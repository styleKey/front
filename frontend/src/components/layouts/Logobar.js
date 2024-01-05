import React from "react";
import "./Logobar.css";
import LogoImage from "../../icon/icon192_stylekey.png";
import YotubeImage from "../../logo/logo_youtube.png";
import InstaImage from "../../logo/Instagram-logo.png";
function Logobar() {
  return (
    <div className="header">
      <div className="header_top">
        <div className="logo_text">StyleKEY</div>
        <div className="header_logos">
          <img src={YotubeImage} className="header_logo1" alt="youtube" />
          <img src={InstaImage} className="header_logo" alt="instagram" />
          <div className="header_login">Login</div>
        </div>
      </div>
    </div>
  );
}

export default Logobar;
