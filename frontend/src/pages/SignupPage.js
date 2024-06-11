import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username
        || !formData.first_name
        || !formData.last_name
        || !formData.email || 
        !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email');
      return;
    }

    try {
      // Make the Post request
      const response = await axios.post('http://54.236.43.35:5000/api/v1/users', formData);
      console.log('Response from server:', response.data);
      // Redirect to profile-setup page if successful
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      alert('Error signing up');
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
      height: '100vh', maxWidth: '600px'
    }}>
      <h2>Sign Up</h2>
      <Form>
        <Form.Group controlId="formBasicFirstName" style={{marginBottom: 
          "2rem"
        }}>
          <Form.Label>First Name</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter first name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName" style={{marginBottom: 
          "2rem"
        }}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter last name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicUserName" style={{marginBottom: 
          "2rem"
        }}>
          <Form.Label>User Name</Form.Label>
          <Form.Control 
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
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
            required
            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
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
            required
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