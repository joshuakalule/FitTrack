import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: 'user1',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make the Post request
      const response = await axios.post('http://192.168.33.9:5000/api/v1/users', formData);
      console.log('Response from server:', response.data);
      // Handle success (eg. show a success message)
      alert('User created successfully');
      // Redirect to profile-setup page
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <Container className="mt-5" style={{
      height: '80vh', maxWidth: '600px'
    }}>
      <h2>Sign Up</h2>
      <Form>
        <Form.Group controlId="formBasicName" style={{marginBottom: 
          "2rem"
        }}>
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter first name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicName" style={{marginBottom: 
          "2rem"
        }}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter last name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail" style={{marginBottom: 
          "2rem"
        }}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" style={{marginBottom: 
          "2rem"
        }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <div className='d-grid gap-2'>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Sign Up
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default SignupPage;
