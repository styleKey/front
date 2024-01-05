import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import YotubeImage from "../../logo/logo_youtube.png";
import InstaImage from "../../logo/Instagram-logo.png";
function Footer() {
  return (
    <div className="footer">
      <div className="footer_main">
        <div className="footer_left">StyleKEY</div>
        <div className="footer_middle">
          <div>Follow</div>
          <div className="header_logos">
            <img src={YotubeImage} className="header_logo1" alt="youtube" />
            <img src={InstaImage} className="header_logo" alt="instagram" />
          </div>
        </div>
        <div className="footer_right">
          <div className="right_top">
            <div>홈페이지 이용약관</div>
            <div className="right_bar">|</div>
            <div>개인정보처리방침</div>
          </div>
          <br />
          <div className="right_middle">
            더키(TheKEY) | 대표:허윤수 | 대표전화 | 개인정보보호책임자:허윤수
            <br />
            사업자등록번호:12343-456-1348857
            <br />
            공용메일@gmail.com
          </div>
          <br />
          <div className="right_bottom">
            COPYRIGHT © 2023 더키(TheKEY). ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
