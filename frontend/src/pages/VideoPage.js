// src/pages/VideoPage.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Typography, Box } from '@mui/material';
import { getVideos } from '../services/apiService';

const VideoPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await getVideos();
      setVideos(response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Typography variant="h4" component="h1" gutterBottom className='typo'>
            Workout Videos
          </Typography>
        </Col>
      </Row>
      <Row>
        {videos.map(video => (
          <Col key={video.id} md={4} className="mb-4">
            <Card className="video-card">
              <Card.Img variant="top" src={video.thumbnail_url} alt={video.title} />
              <Card.Body>
                <Card.Title>{video.title}</Card.Title>
                <Card.Text>{video.description.substring(0, 100)}...</Card.Text>
                <Box mt={2}>
                  <a href={`https://www.youtube.com/watch?v=${video.youtube_video_id}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Watch Video
                  </a>
                </Box>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default VideoPage;
