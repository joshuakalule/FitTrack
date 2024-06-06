import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../assets/styles/custom.scss';
import '../assets/styles/Header.scss';
import dumbell192 from '../assets/images/dumbell192.png';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
    };
  }

  handleToggle = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };

  render() {
    const { menuOpen } = this.state;

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
            <Navbar.Toggle onClick={this.handleToggle} aria-controls="basic-navbar-nav" className='toggler' />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="justify-content-center align-items-center mx-auto nav">
                <Nav.Link
                  className={`${menuOpen ? 'centered-links' : 'menu'}`}
                  as={ Link } to="/" exact
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  className={`${menuOpen ? 'centered-links' : 'menu'}`}
                  as={ Link } to="/about"
                >
                  About
                </Nav.Link>
                <Nav.Link
                  className={`${menuOpen ? 'centered-links' : 'menu'}`}
                  as={ Link } to="/contact"
                >
                  Contact
                </Nav.Link>
                <NavDropdown
                  title="Features"
                  id="basic-nav-dropdown"
                  className={`${menuOpen ? 'centered-links' : 'menu'}`}
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className='justify-content-end'>
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
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
