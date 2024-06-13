import axios from 'axios';

const api = axios.create({
  baseURL: 'http://54.236.43.35:5000/api/v1',
});

export const getUser = (userId) => api.get(`/users/${userId}`);
export const getRoutine = (routineId) => api.get(`/routines/${routineId}`);
export const getProgram = (programId) => api.get(`/programs/${programId}`);
export const getVideo = (videoId) => api.get(`/videos/${videoId}`);
export const getWorkout = (workoutId) => api.get(`/workouts/${workoutId}`);
export const getUserRoutine = (routineId) => api.get(`/get-routine/${routineId}`);

export const getArticles = () => api.get('/articles');
export const getBodyFocuses = () => api.get('/body_focus');
export const getGoals = () => api.get('/goals');
export const getPrograms = () => api.get('/programs');
export const getProgramReviews = () => api.get('/program_reviews');
export const getRoutines = () => api.get('/routines');
export const getUsers = () => api.get('/users');
export const getVideos = () => api.get('/videos');
export const getWorkoutDays = () => api.get('/workout_days');
export const getWorkouts = () => api.get('/workouts');
