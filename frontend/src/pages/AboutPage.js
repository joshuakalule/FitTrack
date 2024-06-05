import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import '../assets/styles/general.scss';

function About() {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <Container>
        <h1>About Us</h1>
        <p>We are a team of passionate developers dedicated to building amazing applications. Our mission is to deliver high-quality software solutions that help businesses thrive in the digital age.</p>

        <h2>Our Journey to FitTrack</h2>
        <p>As part of our software engineering program at ALX, we embarked on a journey to create our first portfolio project for Holberton School. Fitness has always been a significant part of our lives, and we believe it plays a crucial role in leading a healthier lifestyle. With this in mind, we decided to create FitTrack, a web-based fitness tracking application that would help users monitor their workouts, set achievable goals, and track their progress over time.</p>
        
        <h2>The Vision</h2>
        <p>FitTrack aims to be a simple, accessible, and effective fitness tracking tool. We wanted to build an application that allows users to easily log their workouts, set personalized fitness goals, and monitor their progress with clear and insightful data. Our goal was to create an app that supports and motivates users throughout their fitness journey.</p>

        <h2>The Development</h2>
        <p>As a team of three, with one focusing on the front-end, one on the back-end, and one full-stack developer, we combined our skills to develop FitTrack. Using React for the front-end and MySQL with SQLAlchemy for the back-end, we aimed to create a responsive and reliable platform. The web-based nature of FitTrack ensures that users can access their fitness data from any device, making it convenient and flexible. This approach also allowed us to apply our learning and gain practical experience in building a full-stack application.</p>
        
        <h2>The Outcome</h2>
        <p>While we recognize that FitTrack may not yet match the sophistication of advanced fitness apps on the market, we are proud of what we have achieved as part of our ALX program. FitTrack is a reflection of our hard work, learning, and dedication to helping others lead healthier lives. <a href="https://github.com/joshuakalule/FitTrack">Click here</a> to visit our GitHub repository.</p>

        <h2>Meet the Team</h2>
        <Row>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Tare-ere Pimeh</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Frontend Developer</Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item><a href="https://twitter.com/pimehere" target="_blank" rel="noopener noreferrer">Twitter</a></ListGroup.Item>
                  <ListGroup.Item><a href="https://www.linkedin.com/in/pimeh-tare-ere?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BmWcR2p7MQrCaQ6qxJbKDjA%3D%3D" target="_blank" rel="noopener noreferrer">LinkedIn</a></ListGroup.Item>
                  <ListGroup.Item><a href="https://github.com/PimehT" target="_blank" rel="noopener noreferrer">GitHub</a></ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Josua Kalule</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Backend Developer</Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item><a href="https://twitter.com/KarlYoshua" target="_blank" rel="noopener noreferrer">Twitter</a></ListGroup.Item>
                  <ListGroup.Item><a href="https://www.linkedin.com/in/joshua-kalule-9747521a2?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Be453cG0nQs6fD7rYBFlDZA%3D%3D" target="_blank" rel="noopener noreferrer">LinkedIn</a></ListGroup.Item>
                  <ListGroup.Item><a href="https://github.com/joshuakalule" target="_blank" rel="noopener noreferrer">GitHub</a></ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Card.Title>Arthur Apedo Justin</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Full-Stack Developer</Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item><a href="https://x.com/aped_o" target="_blank" rel="noopener noreferrer">Twitter</a></ListGroup.Item>
                  <ListGroup.Item><a href="https://www.linkedin.com/in/apedo-arthur?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2BicrE5C8TX2PiBc1P%2BL%2F5Q%3D%3D" target="_blank" rel="noopener noreferrer">LinkedIn</a></ListGroup.Item>
                  <ListGroup.Item><a href="https://github.com/creeds-knight" target="_blank" rel="noopener noreferrer">GitHub</a></ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
