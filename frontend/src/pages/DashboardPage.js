// src/pages/DashboardPage.js
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, ProgressBar, ListGroup } from 'react-bootstrap';
import { Paper, Typography } from '@mui/material';
import {
  getUser, getRoutine,
  getProgram, getWorkout
 } from '../services/apiService';
import AuthContext from '../utils/AuthContext';
import '../assets/styles/DashboardPage.scss';


const DashboardPage = () => {
  const { getUserProfile } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [routine, setRoutine] = useState([]);
  const [program, setProgram] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId = await getUserProfile();
      const userData = await getUser(userId);
      setUser(userData.data);
      setGoals(userData.data.goals);

      const routineData = await getRoutine(userData.data.routines[0]);
      setRoutine(routineData.data);

      const programData = await getProgram(routineData.data.program_id);
      setProgram(programData.data);

      const workoutPromises = programData.data.workouts.map(workoutId => getWorkout(workoutId));
      const workoutResponses = await Promise.all(workoutPromises);
      const workoutData = workoutResponses.map(response => response.data);
      setWorkouts(workoutData);

      // const videoPromises = workoutData.map(workout => getVideo(workout.video_id));
      // const videoData = await Promise.all(videoPromises);
      // setVideos(videoData.data);
      // console.log(videoData.data);
    };

    fetchData();
  }, [getUserProfile]);

  return (
    <div className='profile-setup'>
      <Container>
        <Row className="mb-4">
          <Col>
            <Typography variant="h4" component="h1" gutterBottom className='typo'>
              Welcome {user.username}
            </Typography>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col md={4}>
            <Paper elevation={3} className="p-3" style={{ borderRadius: "10px" }}>
              <Typography variant="h6" component="h2" className='typo'>
                Total Workouts
              </Typography>
              <ListGroup variant="flush" className="text-center">
                {workouts.map((workout, index) => (
                  <ListGroup.Item key={index}>{workout.title}</ListGroup.Item>
                ))}
              </ListGroup>
            </Paper>
          </Col>
          <Col md={4}>
            <Paper elevation={3} className="p-3" style={{ borderRadius: "10px" }}>
              <Typography variant="h6" component="h2" className='typo'>
                Total Goals
              </Typography>
              <ListGroup variant="flush" className="text-center">
                {goals.map((goal, index) => (
                  <ListGroup.Item key={index}>{goal}</ListGroup.Item>
                ))}
              </ListGroup>
            </Paper>
          </Col>
          <Col md={4}>
            <Paper elevation={3} className="p-3" style={{ borderRadius: "10px" }}>
              <Typography variant="h6" component="h2" className='typo'>
                Total Programs
              </Typography>
              <ListGroup variant="flush" className="text-center">
                <ListGroup.Item>{program.title}</ListGroup.Item>
              </ListGroup>
            </Paper>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <Paper elevation={3} className="p-3" style={{ borderRadius: "10px" }}>
              <Typography variant="h6" component="h2" className='typo'>
                See Programs Progress
              </Typography>
              <h5>{program.title}</h5>
              <ProgressBar now={routine.percent_completion} />
            </Paper>
          </Col>
          {/* Red */}
        </Row>
      </Container>
    </div>
  );
}

export default DashboardPage;
