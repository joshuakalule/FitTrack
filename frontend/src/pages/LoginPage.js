import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import AuthContext from '../utils/AuthContext';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://54.236.43.35:5000/api/v1/login', formData);
      login(response.data.access_token);

      // if successful, check if profile is setup
      const profileResponse = await axios.get('http://54.236.43.35:5000/api/v1/protected', {
        headers: {Authorization: `Bearer ${response.data.access_token}` },
      });
      // if profile setup redirect to dashboard
      if (profileResponse.data.logged_in_as) {
        const userId = profileResponse.data.logged_in_as;
        // store userId in local storage
        const userResponse = await axios.get(`http://54.236.43.35:5000/api/v1/users/${userId}`);
        if (userResponse.data.age !== 0) {
          navigate('/dashboard');
        } else {
          navigate('/profile-setup');
        }
      } 
    } catch (error) {
      console.error('Login Error:', error);
      alert('Invalid email or password');
    }
  };

  return (
    <Container className="mt-5" style={{
      height: '70vh', maxWidth: '600px'
    }}>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
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
          <Button variant="primary" size='lg' type="submit">
            Login
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default LoginPage;