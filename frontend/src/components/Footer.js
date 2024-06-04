import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import '../assets/styles/Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';


export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <div className="container" fluid={true}>
          {/* footer links */}
          <Nav className="justify-content-center justify-content-around">
            <Nav.Item>
              <Nav.Link className="foot-menu" href="/home">About</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="foot-menu" eventKey="/contact">Contact Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="foot-menu" eventKey="/privacy">Privacy Policy</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="foot-menu" eventKey="/terms">Terms of Service</Nav.Link>
            </Nav.Item>
          </Nav>
          {/* footer social media icons */}
          <div className="social-links social-icons" fluid>
            <FontAwesomeIcon className="socials" icon={faXTwitter} />
            <FontAwesomeIcon className="socials" icon={faGithub} />
            <FontAwesomeIcon className="socials" icon={faLinkedin} />
          </div>
          {/* footer bottom text */}
          <p>&copy; { new Date().getFullYear() } FitTrack - All rights reserved.</p>
        </div>
      </div>
    )
  }
}
