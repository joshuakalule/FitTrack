import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../assets/styles/Contact.scss';

function ProfileSetup() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    age: '',
    gender: '',
    weight: '',
    height: '',
    body_parts: [],
    weight_goal: '',
    intensity: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleBodyPartsChange = (e) => {
    const { value, checked } = e.target;
    setProfileData((prevState) => {
      const updatedBodyParts = checked
        ? [...prevState.body_parts, value]
        : prevState.body_parts.filter((part) => part !== value);
      return { ...prevState, body_parts: updatedBodyParts };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Profile Data:', profileData);

    const { age, gender, weight, height, body_parts, weight_goal, intensity } = profileData;
    if (!age || !gender || !weight || !height || body_parts.length === 0 || !weight_goal || !intensity) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post('http://54.236.43.35:5000/api/v1/profile', profileData, config);
      console.log('Response from server:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Profile Setup Error:', error);
    }
  };

  return (
    <div className='profile-setup'>
      <Container style={{ maxWidth: '600px' }}>
        <h2>Profile Setup</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group style={{ marginBottom: "2rem "}}>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={profileData.age}
              onChange={handleInputChange}
              placeholder="Enter your age"
              min="1"
              required
            />
          </Form.Group>

          <Form.Group style={{ marginBottom: "2rem "}}>
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={profileData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group style={{ marginBottom: "2rem "}}>
            <Form.Label>Weight (kg)</Form.Label>
            <Form.Control
              type="number"
              name="weight"
              value={profileData.weight}
              onChange={handleInputChange}
              placeholder="Enter your weight"
              min="1"
              required
            />
          </Form.Group>

          <Form.Group style={{ marginBottom: "2rem "}}>
            <Form.Label>Height (cm)</Form.Label>
            <Form.Control
              type="number"
              name="height"
              value={profileData.height}
              onChange={handleInputChange}
              placeholder="Enter your height"
              min="1"
              required
            />
          </Form.Group>

          <Form.Group style={{ marginBottom: "2rem "}}>
            <Form.Label>Target Body Parts</Form.Label>
            <div>
              {['arms', 'legs', 'back', 'chest', 'abs'].map((part) => (
                <Form.Check
                  key={part}
                  type="checkbox"
                  label={part.charAt(0).toUpperCase() + part.slice(1)}
                  value={part}
                  checked={profileData.body_parts.includes(part)}
                  onChange={handleBodyPartsChange}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group style={{ marginBottom: "2rem "}}>
            <Form.Label>Weight Goal (kg)</Form.Label>
            <Form.Control
              type="number"
              name="weight_goal"
              value={profileData.weight_goal}
              onChange={handleInputChange}
              placeholder="Enter your target weight"
              min="1"
              required
            />
          </Form.Group>

          <Form.Group style={{ marginBottom: "2rem "}}>
            <Form.Label>Preferred Intensity</Form.Label>
            <Form.Control
              as="select"
              name="intensity"
              value={profileData.intensity}
              onChange={handleInputChange}
            >
              <option value="">Select Intensity</option>
              <option value="low">Low</option>
              <option value="mid">Mid</option>
              <option value="high">High</option>
            </Form.Control>
          </Form.Group>

          <div className='d-grid gap-2' style={{ marginBottom: "4rem" }}>
            <Button variant="primary" size='lg' type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default ProfileSetup;
