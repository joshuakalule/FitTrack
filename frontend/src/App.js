import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LayoutPage from './pages/LayoutPage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import VideoPage from './pages/VideoPage';
import ContactPage from './pages/ContactPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfileSetup from './components/ProfileSetup';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './utils/AuthContext';
import WorkoutDaysPage from './pages/WorkoutDaysPage';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LayoutPage />}>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="videos" element={<VideoPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="login" element={<LoginPage />} />
            {/* Protected Routes */}
            <Route element={<PrivateRoute />}>
              <Route path="profile-setup" element={<ProfileSetup />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="workout-days" element={<WorkoutDaysPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
