import React from 'react';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <img src="../src/assets/peptone_inc_logo-removebg-preview.png" alt="Logo" />
        <span>Peptone</span>
      </div>
      <nav className="nav-links">
        <a href="#">CAREERS</a>
        <a href="#">NEWS</a>
      </nav>
      <div className="menu-icon">
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
        <span className="menu-bar"></span>
      </div>
    </header>
  );
};

export default Navbar;
