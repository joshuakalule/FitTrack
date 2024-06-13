import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import AuthContext from '../utils/AuthContext';
import '../assets/styles/custom.scss';
import '../assets/styles/Header.scss';
import dumbell192 from '../assets/images/dumbell192.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='sticky-top'>
      <Navbar expand="lg" className="bg-body-tertiary navbar">
        <Container className='nav-container' fluid={true}>
          <Navbar.Brand as={ Link } to="/">
            <img
              className="logo-img"
              src={ dumbell192 }
              alt="dumbell-logo"
            />
            <span className='logo'>FitTrack</span>
          </Navbar.Brand>
          <Navbar.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" className='toggler' />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-center align-items-center mx-auto nav">
              <Nav.Link
                className={`${menuOpen ? 'centered-links' : 'menu'}`}
                as={ Link } to="/" exact="true"
              >
                Home
              </Nav.Link>
              {isAuthenticated ? (
                <Nav.Link
                  className={`${menuOpen ? 'centered-links' : 'menu'}`}
                  as={ Link } to="/dashboard"
                >
                  Dashboard
                </Nav.Link>
              ) : (
                <Nav.Link
                  className={`${menuOpen ? 'centered-links' : 'menu'}`}
                  as={ Link } to="/about"
                >
                  About
                </Nav.Link>
              )}
              <NavDropdown
                title="Features"
                id="basic-nav-dropdown"
                className={`${menuOpen ? 'centered-links' : 'menu'}`}
              >
                <NavDropdown.Item as={ Link } to="/videos">Videos</NavDropdown.Item>
                <NavDropdown.Item as={ Link } to="/workout-days">Workout Days</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* set login and sign up as conditional
                where if user is logged in, show profile and logout
              */}
            <Nav className='justify-content-end'>
              {isAuthenticated ? (
                <>
                  <Nav.Link
                    className={`${menuOpen ? 'centered-links' : 'menu'}`}
                    as={ Link } to="/profile-setup"
                  >
                    Profile
                  </Nav.Link>
                  <Nav.Link
                    className={`${menuOpen ? 'centered-links' : 'menu'}`}
                    as={ Link } to="/" onClick={logout}
                  >
                    Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    className={`${menuOpen ? 'centered-links' : 'menu'}`}
                    as={ Link } to="/login"
                  >
                    Log In
                  </Nav.Link>
                  <Nav.Link
                    className={`${menuOpen ? 'centered-links' : 'menu'}`}
                    as={ Link } to="/signup"
                  >
                    Sign Up
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
