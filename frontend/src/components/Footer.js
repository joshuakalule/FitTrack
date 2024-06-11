import React, { Component } from 'react';
import { Nav, Row, Col } from 'react-bootstrap';
import '../assets/styles/Footer.scss';

export default class Footer extends Component {
  render() {
    return (
      <div className='footer'>
        <div className="container" fluid={true}>
          {/* Footer links */}
          <Nav className="justify-content-center">
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
          
          {/* Team information */}
          <div className="team-links text-center mt-3">
            <h5>Meet the Team</h5>
            <Row>
              <Col>
                <Nav.Link className='socials' href="https://twitter.com/pimehere" target="_blank" rel="noopener noreferrer">
                  Tare-ere Pimeh
                </Nav.Link>
                <Nav.Link className='socials' href="https://www.linkedin.com/in/pimeh-tare-ere?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BmWcR2p7MQrCaQ6qxJbKDjA%3D%3D" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </Nav.Link>
                <Nav.Link className='socials' href="https://github.com/PimehT" target="_blank" rel="noopener noreferrer">
                  GitHub
                </Nav.Link>
              </Col>
              <Col>
                <Nav.Link className='socials' href="https://twitter.com/KarlYoshua" target="_blank" rel="noopener noreferrer">
                  Joshua Kalule
                </Nav.Link>
                <Nav.Link className='socials' href="https://www.linkedin.com/in/joshua-kalule-9747521a2?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Be453cG0nQs6fD7rYBFlDZA%3D%3D" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </Nav.Link>
                <Nav.Link className='socials' href="https://github.com/joshuakalule" target="_blank" rel="noopener noreferrer">
                  GitHub
                </Nav.Link>
              </Col>
              <Col>
                <Nav.Link className='socials' href="https://x.com/aped_o" target="_blank" rel="noopener noreferrer">
                  Arthur Apedo Justin
                </Nav.Link>
                <Nav.Link className='socials' href="https://www.linkedin.com/in/apedo-arthur?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2BicrE5C8TX2PiBc1P%2BL%2F5Q%3D%3D" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </Nav.Link>
                <Nav.Link className='socials' href="https://github.com/creeds-knight" target="_blank" rel="noopener noreferrer">
                  GitHub
                </Nav.Link>
              </Col>
            </Row>
          </div>

          {/* Footer bottom text */}
          <p className="text-center mt-3">&copy; {new Date().getFullYear()} FitTrack - All rights reserved.</p>
        </div>
      </div>
    );
  }
}
