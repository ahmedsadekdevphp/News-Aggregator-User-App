import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LogoutService from '../Services/LogoutService';
import { useSelector } from 'react-redux';

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const logoutUser = LogoutService();
  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <Navbar className="custom-header" expand="lg">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          <b>.NEWS</b>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto justify-content-center">
            {!isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/login" className="nav-item">
                  {t('header.login')}
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="nav-item">
                  {t('header.register')}
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/news-feed" className="nav-item">
                  {t('header.newsFeed')}
                </Nav.Link>
                <Nav.Link as={Link} to="/search" className="nav-item">
                  {t('header.articleSearch')}
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

        {isLoggedIn && (
          <Nav className="ml-auto">
            <NavDropdown title={t('header.account')} id="account-dropdown">
              <NavDropdown.Item as={Link} to="/preferences">
                {t('header.preferences')}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                {t('header.logout')}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
