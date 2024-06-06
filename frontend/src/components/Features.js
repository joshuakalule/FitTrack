import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import track_workouts from '../assets/images/track_workouts.jpg';
import setting_goal from '../assets/images/setting_goal.jpg';
import progress_tracking from '../assets/images/progress_tracking.jpg';


const featureImages = [
  track_workouts,
  setting_goal,
  progress_tracking
];

const features = [
  {
    title: "Track Workouts",
    description: "Log your workouts and monitor your progress over time. Keep track of daily exercises with checklists, view progress bars for completed tasks, and maintain records of your activity.",
    imageUrl: featureImages[0]
  },
  {
    title: "Setting Goals",
    description: "Set personalized goals and get recommendations for workout plans and videos. Based on your objectives, receive tailored workout routines and video tutorials to help you stay on track and achieve your fitness targets.",
    imageUrl: featureImages[1]
  },
  {
    title: "Progress Tracking",
    description: "Track your progress with detailed analytics and reports. Utilize a calendar to view your workout history, current plans, and future schedules. Stay organized and motivated by visualizing your fitness journey.",
    imageUrl: featureImages[2]
  }
];

const Features = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Key Features</h2>
      <Row className="d-flex flex-column align-items-center">
        {features.map((feature, index) => (
          <Col key={index} md={8} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Img variant="top" src={feature.imageUrl} alt={feature.title} />
              <Card.Body>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Text>{feature.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Features;
