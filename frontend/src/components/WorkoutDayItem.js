import React from 'react';
import { Checkbox, Button, Box } from '@mui/material';

const WorkoutDayItem = ({ workoutDay, onCheckboxChange }) => {
  const { completed_status, workout_id, video_id } = workoutDay;

  const handleCheckboxChange = (event) => {
    onCheckboxChange({...workoutDay, completed_status: event.target.checked });
  };

  return (
    <Box mb={2}>
      <Checkbox checked={completed_status} onChange={handleCheckboxChange} />
      <span>{workout_id.title}</span>
      <Button onClick={() => window.open(`https://youtube.com/watch?v=${video_id.youtube_video_id}`, '_blank')}>Watch</Button>
    </Box>
  );
};

export default WorkoutDayItem;
