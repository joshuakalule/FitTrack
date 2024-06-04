/* The About Page */
import React from 'react';
import { Container } from 'react-bootstrap';
import '../assets/styles/general.scss';


function About() {
  return (
    <div style={{ height: '80vh' }}>
      <Container>
        <h1>About Us</h1>
        <p>We are a team of passionate developers dedicated to building amazing applications.</p>
        <p>Our mission is to deliver high-quality software solutions that help businesses thrive in the digital age.</p>
        <h2>Our Team</h2>
        <p>As ALX students we want to begin our journey to be professional software developers in frontend, design, backend. </p>
        <p>Giving our all to make an impact in the global digital community.</p>
        <p>We work collaboratively to ensure that we meet our clients' needs and exceed their expectations.</p>
      </Container>
    </div>
  );
}

export default About;
