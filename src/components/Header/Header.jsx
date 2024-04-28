import React from "react";
import "./Header.css";
import Logo from "../../../instruction-assets/pursuitlogo.png";

function Header() {
  return (
    <header className="header">
      <img src={Logo} alt="Pursuit Logo" className="logo" />
      <h1 className="title">Student Dashboard</h1>
    </header>
  );
}

export default Header;
