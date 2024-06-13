import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography } from '@mui/material';
import WorkoutDayItem from './WorkoutDayItem'; // Import the new component

const CalendarComponent = ({ workoutDays }) => {
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  const renderWorkoutDetails = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const filteredDays = workoutDays.filter(day => new Date(day.date).setHours(0, 0, 0, 0) === today.getTime());

    if (filteredDays.length === 0) {
      return <Typography variant="body1" className='typo'>No workouts scheduled for this day.</Typography>;
    }

    return filteredDays.map((day, index) => (
      <WorkoutDayItem key={index} workoutDay={day} onCheckboxChange={(updatedDay) => {/* Handle checkbox change */}} />
    ));
  };

  return (
    <Box>
      <Calendar onChange={onChange} value={date} />
      <Box mt={3}>
        <Typography variant="h6" className='typo'>Workout Details</Typography>
        {renderWorkoutDetails()}
      </Box>
    </Box>
  );
};

export default CalendarComponent;
