import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import ProfileCard from './userRes';
import AboutUs from './AboutUs';
import AdminSurveyForm from './SurveyCreator';

function App() {
    return (
        //Link to different pages
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} /> 
                <Route exact path="/admin" element={<AdminSurveyForm />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/profile/:value" element={<ProfileCard />} />
            </Routes>
        </Router>
    );
}

export default App;

