// src/pages/Contact.js
import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import '../assets/styles/Contact.scss';
import '../assets/styles/general.scss';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    /* Here you can handle form submission,
    e.g., send the data to a server or display a success message */
    alert(`Thank you for contacting us, ${name}!`);
  };

  return (
    <div>
      <Container fluid={true} style={{ marginBottom: '3rem', height: '80vh' }}>
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit} className='contact-form'>
          <div className='form-group'>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <Button className='submit-button' as="input" type="submit" value="Submit" />{' '}
        </form>
      </Container>
    </div>
  );
}

export default Contact;
