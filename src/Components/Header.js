import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar className="custom-header" expand="lg">
      <Navbar.Brand as={Link} to="/">
       <b>.NEWS</b> 
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" className="nav-item">Login</Nav.Link>
          <Nav.Link as={Link} to="/register" className="nav-item">Register</Nav.Link>
          <Nav.Link as={Link} to="/news-feed" className="nav-item">News Feed</Nav.Link>

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
