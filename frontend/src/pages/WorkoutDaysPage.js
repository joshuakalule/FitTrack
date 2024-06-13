import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Typography } from '@mui/material';
import { getUser, getUserRoutine } from '../services/apiService';
import AuthContext from '../utils/AuthContext';
import axios from 'axios';

const WorkoutDaysPage = () => {
  const { getUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [workoutDays, setWorkoutDays] = useState([]);

  useEffect(() => {
    const fetchUserAndWorkoutDays = async () => {
      const userId = await getUserProfile();
      if (!userId) {
        navigate('/login');
      } else {
        fetchWorkoutDays(userId);
      }
    };
    fetchUserAndWorkoutDays();
  }, [getUserProfile, navigate]);

  const handleCheckboxChange = async (workoutId, completedStatus) => {
     // Update the state immediately
    setWorkoutDays(workoutDays.map(day => ({
      ...day,
      workout_days: day.workout_days.map(workout => workout.id === workoutId ? { ...workout, completed_status: completedStatus } : workout)
    })));

    try {
      await axios.put(`http://54.236.43.35:5000/api/v1/workout_days/${workoutId}`, { completed_status: completedStatus ? 1 : 0 });
      // After successful update, fetch the workoutDays data again to reflect the changes in the UI
      fetchWorkoutDays();
    } catch (error) {
      console.error('Error updating workout status:', error);
    }
  };

  const fetchWorkoutDays = async (userId) => {
    try {
      const user = await getUser(userId);
      const userResponse = user.data;
      const userRoutinesPromises = userResponse.routines.map(routineId => getUserRoutine(routineId));
      const workoutDaysResponses = await Promise.all(userRoutinesPromises);
      const workoutDaysData = workoutDaysResponses.map(response => response.data);
      console.log(workoutDaysData);
      setWorkoutDays(workoutDaysData);
    } catch (error) {
      console.error('Error fetching workout days:', error);
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Typography variant="h4" component="h1" gutterBottom className='typo'>
            Workout Days
          </Typography>
        </Col>
      </Row>
      <Row>
      {workoutDays.map(day => (
        day.workout_days.map((workout, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card className="workout-day-card">
              <Card.Body>
                <Card.Title>{workout.workout_title}</Card.Title>
                <Card.Text>Date: {new Date(workout.date).toLocaleDateString()}</Card.Text>
                <Form.Check 
                  type="checkbox"
                  label="Status"
                  checked={workout.completed_status}
                  disabled={new Date(workout.date) > new Date()}
                  onChange={() => handleCheckboxChange(workout.id, !workout.completed_status)}
                />
                <Button variant="primary" href={`https://www.youtube.com/watch?v=${workout.video.youtube_video_id}`} target="_blank">Watch Video</Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      ))}
      </Row>
    </Container>
  );
};

export default WorkoutDaysPage;
