import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <Container className="mt-5" style={{
      height: '70vh', maxWidth: '600px'
    }}>
      <h2>Login</h2>
      <Form>
        <Form.Group controlId="formBasicEmail" style={{marginBottom: 
          "2rem"
        }}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" style={{marginBottom: 
          "2rem"
        }}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
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

export default Login;